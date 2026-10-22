// Columnas editables de persona (compartidas por paciente y terapeuta)
const CAMPOS_PERSONA = [
  'rut', 'nombres', 'apellidos', 'fecha_nacimiento', 'genero',
  'telefono', 'email', 'direccion', 'nacionalidad',
];

// Arma "col=?, col=?" solo con los campos presentes en el body, para que un PUT
// parcial no deje en NULL las columnas que no se enviaron.
// `nullables`: campos donde un string vacío se guarda como NULL.
function buildSet(body, fields, nullables = []) {
  const cols = fields.filter((f) => body[f] !== undefined);
  return {
    cols,
    sql: cols.map((f) => `${f}=?`).join(', '),
    params: cols.map((f) => (nullables.includes(f) && body[f] === '' ? null : body[f])),
  };
}

module.exports = { CAMPOS_PERSONA, buildSet };
