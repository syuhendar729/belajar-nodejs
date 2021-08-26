/* === Menghubungkan MongoDB dan Nodejs ===  */

const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";
const dbName = "nodejs";

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((error, client) => {
	if (error) {
		return console.log("Koneksi gagal");
	}

	/* -- Pilih database -- */
	const db = client.db(dbName);

	/* == Menambah data == */

	/* -- Menambahkan 1 data ke collection anime -- */
	/* db.collection('anime').insertOne(
		{
			title: 'Dr.Stone',
			genre: 'Action'
		},
		(error, result) => {
			if (error) {
				return console.log('Gagal tambah data')
			}
			console.log('Berhasil tambah data\n', result)
		}
	) */

	/* -- Menambahkan banyak data ke collection anime -- */
	/* db.collection('anime').insertMany(
		[
			{
				title: 'Dr.Stone',
				genre: 'Action'
			},
			{
				title: 'Dr.Stone',
				genre: 'Action'
			}
		]
		,
		(error, result) => {
			if (error) {
				return console.log('Gagal tambah data')
			}
			return console.log('Berhasil tambah data\n', result)
		}
	) */

	/* == Menampilkan data ==  */

	/* -- Menampilkan banyak data -- */
	/* console.log(
		db
			.collection("anime")
			.find()
			.toArray((error, result) => {
				console.log(result);
			})
	); */

	/* -- Menampilkan data berdasarkan -- */
	/* console.log(
		db
			.collection("anime")
			// .find({ title: 'Charlotte' })
			.find({ _id: ObjectId("6113f36d09aea8079498c881") })
			.toArray((error, result) => {
				console.log(result);
			})
	); */

	/* -- Memperbarui(edit) data berdasarkan id --  */
	/* const updatePromise = db.collection("anime").updateOne(
		{
			_id: ObjectId("6113f36d09aea8079498c881"),
		},
		{
			$set: {
				title: "Dr.Stone",
			},
		}
	);

	updatePromise
		.then((result) => console.log(result))
		.catch((error) => console.log(error)); */
	

	/* -- Memperbarui data lebih dari 1, berdasarkan kriteria */
	/* const updatePromise = db.collection("anime").updateMany(
		{
			title: "Dr.Stone",
		},
		{
			$set: {
				title: "undefined",
			},
		}
	);

	updatePromise
		.then((result) => console.log(result))
		.catch((error) => console.log(error)); */


	/* -- Menghapus 1 data --  */
	const updatePromise = db.collection("anime").deleteOne(
		{
			_id: ObjectId("6113f36d09aea8079498c881"),
		},
		{
			$set: {
				title: "Dr.Stone",
			},
		}
	);
	updatePromise
		.then((result) => console.log(result))
		.catch((error) => console.log(error)); */

});
