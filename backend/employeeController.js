import data from "./data.js";
const getEmployees = (req, res) => {
  res.json(data);
};
const addEmployees = (req, res) => {
  const { name, department } = req.body;
  //   console.log({ name, department, body: req.body });
  if (!name || !department) {
    res.status(400);
    throw new Error("Please Provide Name and Department");
  } else {
    data.push({ name, department, id: data.length + 1 });
    res.status(201).json({ data });
  }
};

const updateEmployees = (req, res) => {
  const { name, department } = req.body;
  const id = req.params.id;
  const employee = data.find((d) => d.id == id);
  if (employee) {
    employee.name = name;
    employee.department = department;
    res.json({ employee });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
};
const deleteEmployees = (req, res) => {
  const { name, department } = req.body;
  const id = req.params.id;
  const employeeIndex = data.findIndex((d) => d.id == id);
  if (employeeIndex > -1) {
    const deleteEmp = data.splice(employeeIndex, 1);
    res.json({ deleteEmp });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
};

const getEmployee = (req, res) => {
  const id = req.params.id;
  const employee = data.find((d) => d.id == id);
  if (employee) {
    res.json({ employee });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
};

export {
  getEmployees,
  addEmployees,
  getEmployee,
  updateEmployees,
  deleteEmployees,
};
