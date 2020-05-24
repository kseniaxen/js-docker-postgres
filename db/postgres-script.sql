-- Table: public.product

-- DROP TABLE public.product;

CREATE TABLE public.product
(
  id SERIAL,
  title CHARACTER varying(25) NOT NULL,
  description CHARACTER varying(255) NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  image text,
  CONSTRAINT pk_id_product PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.product
  OWNER TO postgres;
