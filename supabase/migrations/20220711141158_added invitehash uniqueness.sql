-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

REVOKE ALL ON TABLE public."InviteHash" FROM anon;
REVOKE ALL ON TABLE public."InviteHash" FROM authenticated;
REVOKE ALL ON TABLE public."InviteHash" FROM postgres;
REVOKE ALL ON TABLE public."InviteHash" FROM service_role;
CREATE UNIQUE INDEX IF NOT EXISTS "InviteHash_hash_key"
    ON public."InviteHash" USING btree
    (hash COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

REVOKE ALL ON TABLE public._prisma_migrations FROM anon;
REVOKE ALL ON TABLE public._prisma_migrations FROM authenticated;
REVOKE ALL ON TABLE public._prisma_migrations FROM postgres;
REVOKE ALL ON TABLE public._prisma_migrations FROM service_role;

CREATE UNIQUE INDEX IF NOT EXISTS "Hash_hash_key"
    ON public."Hash" USING btree
    (hash COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
