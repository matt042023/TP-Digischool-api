const trimestreRepository = require('../models/Trimestre');

exports.findAll = () => {
  return trimestreRepository.find();
}

exports.findById = (id) => {
  return trimestreRepository.findById(id);
}

exports.create = (data) => {
  return trimestreRepository.create(data);
}

exports.update = (id, data) => {
  return trimestreRepository.findByIdAndUpdate(id, data);
}

exports.delete = (id) => {
  return trimestreRepository.findByIdAndDelete(id);
}

// let nextTrimestreId = trimestreRepository.length ? Math.max(...trimestreRepository.map((e) => e.idtrimestre)) + 1 : 1;

// exports.findAll = () => {
//   return trimestreRepository;
// };

// exports.findById = (id) => {
//   return trimestreRepository.find((e) => e.idtrimestre === Number(id)) || null;
// };

// exports.create = (data) => {
//   const newTrimestre = {
//     idtrimestre: nextTrimestreId++,
//     nom: data.nom,
//     date: data.date,
//   };
//   trimestreRepository.push(newTrimestre);
//   return newTrimestre;
// };

// exports.update = (id, data) => {
//   const index = trimestreRepository.findIndex((e) => e.idtrimestre === Number(id));
//   if (index === -1) return null;

//   trimestreRepository[index] = {
//     ...trimestreRepository[index],
//     ...data,
//     idtrimestre: trimestreRepository[index].idtrimestre,
//   };

//   return trimestreRepository[index];
// };

// exports.delete = (id) => {
//   const index = trimestreRepository.findIndex((e) => e.idtrimestre === Number(id));
//   if (index === -1) return null;

//   const deleted = trimestreRepository[index];
//   trimestreRepository.splice(index, 1);
//   return deleted;
// };