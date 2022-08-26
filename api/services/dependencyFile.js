const database = require("../../db");
const Component = require("../models/component");
const Child = require("../models/child");

module.exports = () => {
  const service = {};

  service.getComponentNames = async (file) => {
    const resultado = await database.sync();

    const components = JSON.parse(file);

    const names = Object.getOwnPropertyNames(components);

    names.map((name) => {
      try {
        const resultadoCreate = Component.create({
          name,
        });

        return resultadoCreate;
      } catch (e) {
        return e.message();
      }
    });
  };

  service.getDependencies = async (file) => {

    await database.sync();

    const components = JSON.parse(file);

    const names = Object.getOwnPropertyNames(components);

    for(i=0; i < names.length; i++) {
      const name = names[i];
      const childs = components[name].instances;

      const cp = await Component.findOne({
        where: { name }
      })

      if(!cp.id) {
        throw new Error("component not found")
      }

      childs?.map(child => {
        const childData = {}
        childData.parent_id = cp.id
        childData.imported_path = child?.location?.file
        childData.line = child?.location?.start?.line
        childData.column = child?.location?.start?.column

        const exists = Child.findOne({
          where: {
            ...childData
          }
        })

        if(!exists.id) {
          Child.create(childData);
        }
      })

      
      
    }
  

    
  }

  return service;
};
