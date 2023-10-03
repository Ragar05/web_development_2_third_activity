import { useEffect, useState } from "react";
import { InMemoryService } from "../services/InMemory.service";
import { UserModel } from "../types/UserModel";
import { HttpPetitionMock } from "../mocks/HttpPetition.mock";
import { HttpResponseModel } from "../types/HttpResponse";
import { v4 as uuidV4 } from "uuid";

const MS_HTTP_MOCK = 1000;

export const useUser = () => {
  const inMemory = InMemoryService.getInstance();
  const [users, setUsers] = useState<Array<UserModel>>([]);

  useEffect(() => {
    const dataUsers = inMemory.getData<Array<UserModel>>("users");
    if (dataUsers && dataUsers.length > 0) {
      setUsers(dataUsers);
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      inMemory.saveData("users", users);
    }
  }, [users, setUsers]);

  const createUser = async (data: Omit<UserModel, "id">) => {
    const userSaved = new HttpPetitionMock<HttpResponseModel<UserModel>>().run(
      MS_HTTP_MOCK,
      () => {
        const newUser = {
          ...data,
          id: uuidV4(),
        };

        setUsers((users) => [...users, { ...newUser }]);
        return {
          ok: true,
          message: "el usuario se ha creado de forma exitosa",
          data: newUser,
        };
      }
    );

    return await userSaved;
  };

  const findUserBy = async (op: {
    where: { field: keyof UserModel; value: string | number | any }[];
  }) => {
    const userSaved = new HttpPetitionMock<
      HttpResponseModel<UserModel | null>
    >().run(MS_HTTP_MOCK, () => {
      
      const user = users.find(user => op.where.every(condition => user[condition.field] === condition.value))

      return {
        ok: true,
        message: "el usuario se ha encontrado de forma exitosa",
        data: user,
      };
    });

    return await userSaved;
  };

  return {
    createUser,
    findUserBy,
  };
};
