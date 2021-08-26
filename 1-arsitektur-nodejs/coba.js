// == Asynchronous pada nodejs ===

const getUser = (id, cb) => {
	const time = id === 1 ? 3000 : 2000
	setTimeout( () => {
		const nama = id === 1 ? 'Syuhada' : 'Rantisi'
		cb({id, nama})
	}, time)
}


const user1 = getUser(1, (hasil) => {
	console.log(hasil)
})

const user2 = getUser(2, (hasil) => {
	console.log(hasil)
})

const hello = 'Hello world'
console.log(hello)
