(async () => {
  const database = require("./db");
  const Component = require("./models/component");

  try {
    const resultado = await database.sync();

    const resultadoCreate = await Component.create({
      name: "ComponentToRemove"
    });
    console.log(resultadoCreate);

  } catch (error) {
    console.log(error);
  }
})();
