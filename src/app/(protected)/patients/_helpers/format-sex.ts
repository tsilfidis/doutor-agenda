type Sex = "male" | "female";

export const formatSex = (sex: Sex) => {
  const sexMap: Record<Sex, string> = {
    male: "Masculino",
    female: "Feminino",
  };

  return sexMap[sex];
};
