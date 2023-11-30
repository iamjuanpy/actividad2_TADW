FROM mongo

COPY init.json /init.json

CMD mongoimport --host mongodb --db express-mongo-app --collection peliculas --type json --file /init.json --jsonArray --upsertFields name