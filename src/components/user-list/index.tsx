import React, { Suspense } from "react";
import { View, Text, ActivityIndicator, TextInput } from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { User } from "@/core/user";
import DateRangeFilter from "../date-range-filter";
import { useUserFilter } from "@/hooks/useFilterUsers";
import { RenderUser } from "./render-user";
import { UserListFooter } from "./user-list-footer";

interface Props {
  users: User[];
  isLoading: boolean;
  deleteUser: (id: string) => void;
  editUser: (user: User) => void;
  fetchUsers: () => void;
}

export default function UserList({
  users,
  deleteUser,
  editUser,
  fetchUsers,
  isLoading,
}: Props) {
  const {
    searchEmail,
    setSearchEmail,
    purchaseDate,
    setPurchaseDate,
    filteredUsers,
  } = useUserFilter(users);

  const renderItem = ({ item: user }: ListRenderItemInfo<User>) => (
    <RenderUser editUser={editUser} user={user} deleteUser={deleteUser} />
  );

  const renderListHeaderComponent = () => (
    <Text className="text-sm font-headingBold text-gray-100 text-center my-4">
      Total de usuários: {filteredUsers.length}
    </Text>
  );

  const renderListFooterComponent = () => (
    <UserListFooter isLoading={isLoading} />
  );

  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#fe017f" />}>
      <View className="flex-col items-center gap-y-2 my-10">
        <Text className="text-xl font-headingBold text-gray-100 mb-4">
          Usuários Cadastrados
        </Text>

        <View className="w-full mb-3">
          <TextInput
            className="w-full p-2 border border-gray-300 rounded-md mb-2 z-50"
            placeholder="Buscar por email"
            placeholderTextColor="#374151"
            style={{ color: "#f3f4f6", fontSize: 12 }}
            value={searchEmail}
            onChangeText={setSearchEmail}
          />
        </View>

        <DateRangeFilter
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate}
        />
      </View>

      <FlashList
        data={filteredUsers}
        ListHeaderComponent={renderListHeaderComponent}
        contentContainerStyle={{ paddingBottom: 20 }}
        estimatedItemSize={2000}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onEndReached={fetchUsers}
        onEndReachedThreshold={0.05}
        ListFooterComponent={renderListFooterComponent}
      />
    </Suspense>
  );
}
