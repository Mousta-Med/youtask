--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-23 20:55:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16397)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id uuid NOT NULL,
    description character varying(500),
    status character varying(255) NOT NULL,
    title character varying(100) NOT NULL,
    created_date timestamp(6) without time zone,
    created_by character varying(255),
    last_modified_by character varying(255),
    last_modified_date timestamp(6) without time zone,
    CONSTRAINT task_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'IN_PROGRESS'::character varying, 'COMPLETED'::character varying])::text[])))
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 16397)
-- Dependencies: 217
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (id, description, status, title, created_date, created_by, last_modified_by, last_modified_date) FROM stdin;
9eb2cf25-adff-4df8-9b1e-96697901ce4f	yep is just fot test	PENDING	this just for test 	2025-06-23 20:20:06.779674	\N	\N	2025-06-23 20:44:38.120615
\.


--
-- TOC entry 4743 (class 2606 OID 16404)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


-- Completed on 2025-06-23 20:55:52

--
-- PostgreSQL database dump complete
--

