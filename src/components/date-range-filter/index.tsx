import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

interface Props {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export default function DateRangeFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) {
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);

  const onChangeStartDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      const newEndDate = dayjs(selectedDate).add(1, "year").toDate();
      setEndDate(newEndDate);
    }
  };

  const onChangeEndDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  const clearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <View className="w-full">
      <View className="w-full flex flex-col mb-3">
        <TouchableHighlight
          onPress={() => setShowStartDatePicker(true)}
          className="w-full rounded-md p-3 border border-primary"
        >
          <Text className="text-center text-white font-headingBold">
            Selecione a data inicial
          </Text>
        </TouchableHighlight>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="inline"
            onChange={onChangeStartDate}
          />
        )}
        <Text className="text-xs font-headingBold text-gray-300">
          Data Inicial:{" "}
          {startDate
            ? startDate.toLocaleDateString("pt-br")
            : "Não selecionada"}
        </Text>
      </View>

      <View className="w-full flex flex-col mb-3">
        <TouchableHighlight
          onPress={() => setShowEndDatePicker(true)}
          className="w-full rounded-md p-3 border border-primary"
        >
          <Text className="text-center text-white font-headingBold">
            Selecione a data final
          </Text>
        </TouchableHighlight>

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="inline"
            onChange={onChangeEndDate}
          />
        )}
        <Text className="text-xs font-headingBold text-gray-300">
          Data Final:{" "}
          {endDate ? endDate.toLocaleDateString("pt-br") : "Não selecionada"}
        </Text>
      </View>
      <TouchableHighlight
        onPress={clearDates}
        className="w-full rounded-md p-3 bg-primary"
      >
        <Text className="text-center text-white font-headingBold">
          Limpar Datas
        </Text>
      </TouchableHighlight>
    </View>
  );
}
