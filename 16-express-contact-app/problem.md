
# Masalah yg dialami

1. File css local tidak terpanggil
solusi: ubah di main-layouts link css menjadi full url

2. Localhost yg stuck sebentar ketika add data
penyebab: file data .json berubah membuat nodemon mengulang
solusi: nodemon -i data/contacts.json
atau : nodemon -i data/
