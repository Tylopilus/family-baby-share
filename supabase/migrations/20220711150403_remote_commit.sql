-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public."InviteHash"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    hash text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "InviteHash_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."InviteHash"
    OWNER to postgres;

GRANT ALL ON TABLE public."InviteHash" TO authenticated;

GRANT ALL ON TABLE public."InviteHash" TO postgres;

GRANT ALL ON TABLE public."InviteHash" TO anon;

GRANT ALL ON TABLE public."InviteHash" TO service_role;
CREATE UNIQUE INDEX IF NOT EXISTS "InviteHash_hash_key"
    ON public."InviteHash" USING btree
    (hash COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public."Children"
(
    id integer NOT NULL DEFAULT nextval('"Children_id_seq"'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Children_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Children"
    OWNER to postgres;

GRANT ALL ON TABLE public."Children" TO authenticated;

GRANT ALL ON TABLE public."Children" TO postgres;

GRANT ALL ON TABLE public."Children" TO anon;

GRANT ALL ON TABLE public."Children" TO service_role;

CREATE TABLE IF NOT EXISTS public."Hash"
(
    hash text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Hash_pkey" PRIMARY KEY (hash)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Hash"
    OWNER to postgres;

GRANT ALL ON TABLE public."Hash" TO authenticated;

GRANT ALL ON TABLE public."Hash" TO postgres;

GRANT ALL ON TABLE public."Hash" TO anon;

GRANT ALL ON TABLE public."Hash" TO service_role;
CREATE UNIQUE INDEX IF NOT EXISTS "Hash_hash_key"
    ON public."Hash" USING btree
    (hash COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public."AccessHashTable"
(
    "childrenId" integer NOT NULL,
    hash text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "AccessHashTable_pkey" PRIMARY KEY ("childrenId", hash),
    CONSTRAINT "AccessHashTable_childrenId_fkey" FOREIGN KEY ("childrenId")
        REFERENCES public."Children" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "AccessHashTable_hash_fkey" FOREIGN KEY (hash)
        REFERENCES public."Hash" (hash) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."AccessHashTable"
    OWNER to postgres;

GRANT ALL ON TABLE public."AccessHashTable" TO authenticated;

GRANT ALL ON TABLE public."AccessHashTable" TO postgres;

GRANT ALL ON TABLE public."AccessHashTable" TO anon;

GRANT ALL ON TABLE public."AccessHashTable" TO service_role;