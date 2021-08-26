# Catatan belajar mongodb (instalasi dan config)

## melihat database
`show dbs`

## menggunakan database
`use <namaDB>`

## membuat collection (table)
`db.createCollection('anime')`
### dicoba
```
> db.createCollection('anime')
{ "ok" : 1  }
```

## insert to collection
`db.anime.insertOne({title: "Shingeki no Kyoujin", genre: "thriller"})`
`db.anime.insertMany([data1, data2])`
### contoh :
```
> db.anime.insertMany([
		... {
... title: "Charlotte",
... genre: "School, Drama"
... 
		},
		... {
... title: "Death Note",
... genre:"Thriller"
... 
		}
... 
]
... )
{
        "acknowledged" : true,
		"insertedIds" : [
                ObjectId("60fbd00bfff7a49f99dcd409"),
                ObjectId("60fbd00bfff7a49f99dcd40a")
        
		]

}
>
```
### showing :
```
> db.anime.find()
{ "_id" : ObjectId("60fbc9ecfff7a49f99dcd408"), "title" : "Shingeki no Kyoujin", "genre" : "thriller"  }
{ "_id" : ObjectId("60fbd00bfff7a49f99dcd409"), "title" : "Charlotte", "genre" : "School, Drama"  }
{ "_id" : ObjectId("60fbd00bfff7a49f99dcd40a"), "title" : "Death Note", "genre" : "Thriller"  }
>
```
