# установка основы нового образа из готового образа с уже предустановленным postgres версии 10.12
FROM postgres:10.12
# 
LABEL maintainer="tyaa"
# 
EXPOSE 5432
# 
COPY postgres-script.sql /docker-entrypoint-initdb.d/
# 
VOLUME [ "var/lib/postgresql/data" ]