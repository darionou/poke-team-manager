export function extractVariables(row: object) {
    const columns = [];
    const variables = [];
    const columnsVariables = [];
    const values = [];
  
    for (const [index, [column, value]] of Object.entries(row).entries()) {
      columns.push(column);
  
      const variable = `$${index + 1}`;
      variables.push(variable);
      columnsVariables.push(`${column} = ${variable}`);
  
      values.push(value);
    }
  
    return { columns, variables, columnsVariables, values };
}