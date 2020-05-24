# установка основы нового образа из готового образа с уже предустановленным postgres версии 10.12
FROM postgres:10.12
# метаданные: никнейм поддержки образа
LABEL maintainer="tyaa"
# порт, который будет использован СУБД из образа
EXPOSE 5432
# задание выполнить сценарий создания содержимого БД
COPY postgres-script.sql /docker-entrypoint-initdb.d/
# внутренний путь к каталогу с данными БД
VOLUME [ "var/lib/postgresql/data" ]