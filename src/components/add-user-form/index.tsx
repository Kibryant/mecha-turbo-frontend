import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUsersSchema, type CreateUserSchema } from "@/lib/schemas";
import DatePickerModal from "@/components/date-picker-modal";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface Props {
  onSubmit: ({
    name,
    email,
    date,
  }: {
    name: string;
    email: string;
    date: Date;
  }) => void;
}

export default function AddUserForm({ onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUsersSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View className="flex-col items-center gap-y-4 w-full">
      <View className="w-full">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Nome do Usuário"
              accessibilityLabel="Nome"
              placeholderTextColor="#374151"
              style={{ color: "#f3f4f6", fontSize: 12 }}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text className="text-red-500">{errors.name.message}</Text>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Email do Usuário"
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email"
              placeholderTextColor="#374151"
              style={{ color: "#f3f4f6", fontSize: 12 }}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text className="text-red-500">{errors.email.message}</Text>
        )}

        <View className="w-full gap-y-2">
          <TouchableHighlight
            onPress={() => setShowDatePicker(true)}
            className="w-full rounded-md p-3 border border-primary"
          >
            <Text className="text-center text-white font-headingBold">
              Selecionar a data de compra
            </Text>
          </TouchableHighlight>
          <Text className="text-xs font-headingBold text-gray-300">
            Data de compra: {date.toLocaleDateString("pt-br")}
          </Text>
        </View>
      </View>

      <View className="w-full mb-4 rounded-md gap-y-2 items-center">
        {showDatePicker && (
          <DatePickerModal date={date} onChangeDate={onChangeDate} />
        )}

        <TouchableOpacity
          className="w-full bg-primary rounded-md py-4"
          onPress={handleSubmit((data) => onSubmit({ ...data, date }))}
          disabled={isLoading}
        >
          <Text className="text-center text-white font-headingBold">
            Adicionar Usuário
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
