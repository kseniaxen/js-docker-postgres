-- Table: public.product

-- DROP TABLE public.product;
-- сценарий создания таблицы Товары
CREATE TABLE public.product
(
  id SERIAL, -- идентификатор-счетчик
  title CHARACTER varying(25) NOT NULL, -- наименование товара
  description CHARACTER varying(255) NOT NULL, -- описание товара
  price NUMERIC NOT NULL, -- цена за единицу товара
  quantity INTEGER NOT NULL, -- количество товара в наличии
  image text, -- изображение товара
  CONSTRAINT pk_id_product PRIMARY KEY (id) -- добавление ограничения первичного ключа к колонке id
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.product
  OWNER TO postgres;
