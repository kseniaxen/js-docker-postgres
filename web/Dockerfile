# установка основы нового образа из готового образа с уже предустановленным Node.js версии 10 и соответствующего NPM
FROM node:12
# создание директории приложения
# RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app
# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности 
# скопировать оба файла: package.json и package-lock.json,
# но использование package-lock.json может вызвать ошибку!
# COPY package*.json ./
COPY package.json ./
# скачивание зависимостей, определенных в файле package.json
RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production
# копируем внутрь образа в корень (вторая точка) весь исходный код, исключая указанный в файле .dockerignore
COPY . .
# COPY wait-for-it.sh .
EXPOSE 8080
# запускаем веб-приложение внутри контейнераы
CMD [ "node", "app.js" ]