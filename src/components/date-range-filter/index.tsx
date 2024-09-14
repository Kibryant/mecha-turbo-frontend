import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface Props {
  purchaseDate: Date | undefined;
  setPurchaseDate: (date: Date | undefined) => void;
}

export default function DateRangeFilter({
  purchaseDate,
  setPurchaseDate,
}: Props) {
  const [showPuchaseDatePicker, setShowPuchaseDatePicker] =
    React.useState(false);

  const onChangePurchaseDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    const currentDate = selectedDate || purchaseDate;
    setShowPuchaseDatePicker(false);
    setPurchaseDate(currentDate);
  };

  const clearDates = () => {
    setPurchaseDate(undefined);
  };

  return (
    <View className="w-full">
      <View className="w-full flex flex-col mb-3">
        <TouchableHighlight
          onPress={() => setShowPuchaseDatePicker((prev) => !prev)}
          className="w-full rounded-md p-3 border border-primary"
        >
          <Text className="text-center text-white font-headingBold">
            Buscar por data de compra:{" "}
            {purchaseDate
              ? purchaseDate.toLocaleDateString("pt-br")
              : "Não selecionada"}
          </Text>
        </TouchableHighlight>
        {showPuchaseDatePicker && (
          <DateTimePicker
            value={purchaseDate || new Date()}
            mode="date"
            display="inline"
            onChange={onChangePurchaseDate}
          />
        )}
      </View>

      <TouchableHighlight
        onPress={clearDates}
        className="w-full rounded-md py-2 px-1 bg-primary"
      >
        <Text className="text-center text-white font-headingBold">
          Limpar Data
        </Text>
      </TouchableHighlight>
    </View>
  );
}
