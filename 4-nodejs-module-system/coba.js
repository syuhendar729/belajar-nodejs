function cetakNama(nama){
	return `Hello my name is ${nama}`
}

const pi = 3.14

const org = {
	nama: 'Syuhada Rantisi',
	umur: 23,
	cetakOrg(){
		return `Halo, nama sy ${this.nama} dan umur ${this.umur} tahun`
	}
}

class Orang {
	constructor(){
		console.log('Class telah dibuat')
	}
}

// -- cara exports --
// module.exports.cetakNama = cetakNama
// module.exports.pi 		= pi
// module.exports.org 		= org
// module.exports.Orang	= Orang

// -- exports semua dgn object --
// module.exports = {
//     cetakNama: cetakNama,
//     pi: pi,
//     org: org,
//     Orang: Orang
// }

// -- export semua dgn object tanpa value karna sama (key = value) ---
module.exports = {cetakNama, pi, org, Orang}





