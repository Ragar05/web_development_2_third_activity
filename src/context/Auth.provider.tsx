import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { authContext } from "./Auth.context";
import { UserModel } from "../types/UserModel";
import { InMemoryService } from "../services/InMemory.service";
export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const inMemory = InMemoryService.getInstance();
  const [user, setUser] = useState<UserModel | null>(null);
  const { createUser, findUserBy } = useUser();

  useEffect(() => {
    const data = inMemory.getData<UserModel[]>("credentials");
    if (data && data.length > 0) {
      setUser(data[0]);
    }
  }, []);

  const logOut = async () => setUser(null);

  const signUp = async (data: Omit<UserModel, "id">) => {
    if (
      !data.email ||
      data.email === "" ||
      !data.fullname ||
      data.fullname === "" ||
      !data.password ||
      data.password === ""
    ) {
      alert("Debe de completar todos los campos de registro");
      return;
    }

    const existUserWithEmail = await findUserBy({
      where: [{ field: "email", value: data.email }],
    });

    if (existUserWithEmail.data) {
      alert("EL correo ingresado ya esta en uso");
      return;
    }

    const userCreated = await createUser(data);

    if (userCreated.ok && userCreated.data) {
      alert(userCreated.message);
      setUser(userCreated.data);
    }
  };

  const signIn = async (data: Omit<UserModel, "fullname" | "id">) => {
    const userFinded = await findUserBy({
      where: [
        { field: "email", value: data.email },
        { field: "password", value: data.password },
      ],
    });

    if (!userFinded.data) {
      alert("El correo o la contrasena es incorrecto");
      return;
    }

    setUser(userFinded.data);
    alert("Haz iniciado sesion correctamente");
  };

  return (
    <authContext.Provider
      value={{
        user,
        logOut,
        signIn,
        signUp,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
