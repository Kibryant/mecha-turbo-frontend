import React from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View } from "react-native";

interface Props {
  date: Date;
  onChangeDate: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

export default function DatePickerModal({ date, onChangeDate }: Props) {
  return (
    <View>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChangeDate}
      />
    </View>
  );
}
