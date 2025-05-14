-- Criação das tabelas do sistema de reserva de salas

-- Tabela CATEGORIA_EMPRESA
CREATE TABLE CATEGORIA_EMPRESA (
    CATEMP_ID integer PRIMARY KEY,
    CATEMP_DESCRICAO character varying,
    CATEMP_PREFIXPARTICAO character varying
);

-- Tabela DISPONIBILIDADE
CREATE TABLE DISPONIBILIDADE (
    DIS_ID integer PRIMARY KEY,
    DIS_ATIVO boolean,
    DIS_MINDIASCAN integer,
    DIS_DIASEMANAINDEX integer,
    DIS_INTERVALOMINUTOS integer,
    DIS_SAL_ID integer,
    DIS_HRABERTURA character varying,
    DIS_HRFIM character varying,
    DIS_DIASEMAMA character varying
);

-- Tabela EMPRESA
CREATE TABLE EMPRESA (
    EMP_ID integer PRIMARY KEY,
    EMP_CPFCNPJ bigint NOT NULL,
    EMP_CEP integer NOT NULL,
    EMP_CATEMP_ID integer,
    EMP_USERINCLUI integer,
    EMP_DTAINCLUI timestamp(6) without time zone,
    EMP_USERALTERA integer NOT NULL,
    EMP_DTAALTERA timestamp(6) without time zone NOT NULL,
    EMP_LOGOURL text NOT NULL,
    EMP_PROVIDER integer,
    EMP_STATUS character varying,
    EMP_ASSINATURA_STATUS character varying,
    EMP_DISPONIBILIDADE character varying,
    EMP_NOME character varying,
    EMP_TELEFONE character varying NOT NULL,
    EMP_MUNICIPIO character varying NOT NULL,
    EMP_ESTADO character varying NOT NULL,
    EMP_PAIS character varying NOT NULL,
    EMP_ENDERECO character varying NOT NULL,
    EMP_NUMEROENDERECO character varying NOT NULL,
    EMP_DISPONIBILIDADE_PADRAO json NOT NULL,
    EMP_PLANO integer NOT NULL,
    FOREIGN KEY (EMP_CATEMP_ID) REFERENCES CATEGORIA_EMPRESA(CATEMP_ID)
);

-- Tabela PERMISSAO
CREATE TABLE PERMISSAO (
    PER_ID integer PRIMARY KEY,
    PER_DESCRI character varying
);

-- Tabela PESSOA
CREATE TABLE PESSOA (
    PES_ID integer PRIMARY KEY,
    PES_CPFCNPJ bigint,
    PES_NUMERO integer NOT NULL,
    PES_TELEFONE bigint NOT NULL,
    PES_CEP integer NOT NULL,
    PES_USUINCLUI integer NOT NULL,
    PES_DTAINCLUI timestamp(6) without time zone,
    PES_USUALTERA integer NOT NULL,
    PES_DTAALTERA timestamp(6) without time zone,
    PES_FOTO text NOT NULL,
    PES_NAME character varying,
    PES_FUNCAO character varying NOT NULL,
    PES_MUNICIPIO character varying NOT NULL,
    PES_ESTADO character varying NOT NULL,
    PES_PAIS character varying NOT NULL,
    PES_ENDERECO character varying NOT NULL,
    PES_DATANASCIMENTO character varying NOT NULL
);

-- Tabela STATUS
CREATE TABLE STATUS (
    STA_ID integer PRIMARY KEY,
    STA_TIPO "STATUS_sta_tipo_enum"
);

-- Tabela SALA
CREATE TABLE SALA (
    SAL_ID integer PRIMARY KEY,
    SAL_STATUS integer,
    SAL_MULTIPLASMARCACOES boolean,
    SAL_FOTO text NOT NULL,
    SAL_EMP_ID integer,
    SAL_NOME character varying,
    FOREIGN KEY (SAL_EMP_ID) REFERENCES EMPRESA(EMP_ID),
    FOREIGN KEY (SAL_STATUS) REFERENCES STATUS(STA_ID)
);

-- Tabela USUARIO
CREATE TABLE USUARIO (
    USU_ID integer PRIMARY KEY,
    USU_STATUS integer,
    USU_RESETCODE integer NOT NULL,
    USU_USERINCLUI integer NOT NULL,
    USU_DTAINCLUI timestamp(6) without time zone,
    USU_USERALTERA integer NOT NULL,
    USU_DTAALTERA timestamp(6) without time zone,
    USU_PER_ID integer,
    USU_EMP_ID integer NOT NULL,
    USU_PES_ID integer,
    USU_LOGIN character varying,
    USU_SENHA character varying,
    USU_PUSHTOKEN character varying NOT NULL,
    FOREIGN KEY (USU_PER_ID) REFERENCES PERMISSAO(PER_ID),
    FOREIGN KEY (USU_EMP_ID) REFERENCES EMPRESA(EMP_ID),
    FOREIGN KEY (USU_PES_ID) REFERENCES PESSOA(PES_ID),
    FOREIGN KEY (USU_STATUS) REFERENCES STATUS(STA_ID)
);

-- Tabela RESPONSAVEL
CREATE TABLE RESPONSAVEL (
    RESP_ID integer PRIMARY KEY,
    RESP_SAL_ID integer,
    RESP_USU_ID integer,
    FOREIGN KEY (RESP_SAL_ID) REFERENCES SALA(SAL_ID),
    FOREIGN KEY (RESP_USU_ID) REFERENCES USUARIO(USU_ID)
);

-- Tabela RESERVA
CREATE TABLE RESERVA (
    RES_ID integer PRIMARY KEY,
    RES_DATA timestamp without time zone,
    RES_DIASEMANAINDEX integer,
    RES_SAL_ID integer,
    RES_USU_ID integer,
    RES_HRINICIO character varying,
    RES_HRFIM character varying,
    RES_OBSERVACAO character varying,
    FOREIGN KEY (RES_SAL_ID) REFERENCES SALA(SAL_ID),
    FOREIGN KEY (RES_USU_ID) REFERENCES USUARIO(USU_ID)
);

-- Tabela STATUS_RESERVA
CREATE TABLE STATUS_RESERVA (
    STARES_ID integer PRIMARY KEY,
    STARES_RES_ID integer,
    STARES_STA_ID integer,
    STARES_STA_DATE timestamp(6) without time zone,
    FOREIGN KEY (STARES_RES_ID) REFERENCES RESERVA(RES_ID),
    FOREIGN KEY (STARES_STA_ID) REFERENCES STATUS(STA_ID)
);

-- Adicionar Foreign Key para DISPONIBILIDADE
ALTER TABLE DISPONIBILIDADE
ADD CONSTRAINT FK_DISPONIBILIDADE_SALA
FOREIGN KEY (DIS_SAL_ID) REFERENCES SALA(SAL_ID);