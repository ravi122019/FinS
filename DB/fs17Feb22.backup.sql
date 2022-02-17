--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8
-- Dumped by pg_dump version 12.8

-- Started on 2022-02-17 17:15:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 208 (class 1259 OID 24986)
-- Name: fsStaticDataSeq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."fsStaticDataSeq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."fsStaticDataSeq" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 24988)
-- Name: fsdesignation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fsdesignation (
    id bigint NOT NULL,
    created_by character varying(255),
    created_time_stamp timestamp without time zone,
    delete_status boolean DEFAULT false NOT NULL,
    modified_by character varying(255),
    modified_time_stamp timestamp without time zone,
    version bigint,
    name character varying(255) NOT NULL,
    firmid bigint NOT NULL,
    user_id bigint
);


ALTER TABLE public.fsdesignation OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 41663)
-- Name: fsexpensetype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fsexpensetype (
    id bigint NOT NULL,
    created_by character varying(255),
    created_time_stamp timestamp without time zone,
    delete_status boolean DEFAULT false NOT NULL,
    modified_by character varying(255),
    modified_time_stamp timestamp without time zone,
    version bigint,
    name character varying(255) NOT NULL,
    firmid bigint NOT NULL
);


ALTER TABLE public.fsexpensetype OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 24704)
-- Name: fsfirm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fsfirm (
    id bigint NOT NULL,
    created_by character varying(255),
    created_time_stamp timestamp without time zone,
    delete_status boolean DEFAULT false NOT NULL,
    modified_by character varying(255),
    modified_time_stamp timestamp without time zone,
    version bigint NOT NULL,
    name character varying(255) NOT NULL,
    my_referral_code character varying(255),
    pancard character varying(255),
    referred_by character varying(255),
    registration_id character varying(255),
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    district character varying(255) NOT NULL,
    email_id character varying(255) NOT NULL,
    is_active boolean DEFAULT true,
    mobile_number character varying(255) NOT NULL,
    re_new_due_date timestamp without time zone,
    registration_date timestamp without time zone,
    state character varying(255) NOT NULL
);


ALTER TABLE public.fsfirm OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 24751)
-- Name: fslocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fslocation (
    id bigint NOT NULL,
    created_by character varying(255),
    created_time_stamp timestamp without time zone,
    delete_status boolean DEFAULT false NOT NULL,
    modified_by character varying(255),
    modified_time_stamp timestamp without time zone,
    version bigint,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    firmid bigint NOT NULL,
    name character varying(255) NOT NULL,
    state character varying(255) NOT NULL
);


ALTER TABLE public.fslocation OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 25034)
-- Name: fsmenus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fsmenus (
    id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.fsmenus OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 25039)
-- Name: fsrole; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fsrole (
    id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE public.fsrole OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 25024)
-- Name: fsstatecity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fsstatecity (
    id bigint NOT NULL,
    city character varying(255) NOT NULL,
    district character varying(255) NOT NULL,
    state character varying(255) NOT NULL
);


ALTER TABLE public.fsstatecity OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 24713)
-- Name: fsuser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fsuser (
    id bigint NOT NULL,
    created_by character varying(255),
    created_time_stamp timestamp without time zone,
    delete_status boolean DEFAULT false NOT NULL,
    modified_by character varying(255),
    modified_time_stamp timestamp without time zone,
    version bigint NOT NULL,
    password character varying(255),
    firmid bigint NOT NULL,
    middle_name character varying(255),
    user_profile_img bytea,
    designation_id bigint,
    aadhar character varying(255),
    address character varying(255) NOT NULL,
    blood_group character varying(255),
    city character varying(255) NOT NULL,
    confirm_password character varying(255) NOT NULL,
    ctc numeric(19,2),
    date_of_birth timestamp without time zone,
    date_of_joining timestamp without time zone,
    district character varying(255) NOT NULL,
    emial_id character varying(255) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    login_name character varying(255) NOT NULL,
    mobile_number character varying(255) NOT NULL,
    state character varying(255) NOT NULL,
    user_code character varying(255),
    last_login timestamp without time zone
);


ALTER TABLE public.fsuser OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24586)
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 25044)
-- Name: roles_menus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_menus (
    role_id bigint NOT NULL,
    menus_id bigint NOT NULL
);


ALTER TABLE public.roles_menus OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 24729)
-- Name: spring_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spring_session (
    primary_id character(36) NOT NULL,
    session_id character(36) NOT NULL,
    creation_time bigint NOT NULL,
    last_access_time bigint NOT NULL,
    max_inactive_interval integer NOT NULL,
    expiry_time bigint NOT NULL,
    principal_name character varying(100)
);


ALTER TABLE public.spring_session OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 24737)
-- Name: spring_session_attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spring_session_attributes (
    session_primary_id character(36) NOT NULL,
    attribute_name character varying(200) NOT NULL,
    attribute_bytes bytea NOT NULL
);


ALTER TABLE public.spring_session_attributes OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 25047)
-- Name: users_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_roles (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.users_roles OWNER TO postgres;

--
-- TOC entry 2919 (class 0 OID 24988)
-- Dependencies: 209
-- Data for Name: fsdesignation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fsdesignation (id, created_by, created_time_stamp, delete_status, modified_by, modified_time_stamp, version, name, firmid, user_id) FROM stdin;
\.


--
-- TOC entry 2925 (class 0 OID 41663)
-- Dependencies: 215
-- Data for Name: fsexpensetype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fsexpensetype (id, created_by, created_time_stamp, delete_status, modified_by, modified_time_stamp, version, name, firmid) FROM stdin;
1	FinS|Master	2021-11-16 22:46:25	f	FinS|Master	2021-11-16 22:46:25	0	ABC	1
2	FinS|Master	2021-11-16 22:46:25	f	FinS|Master	2021-11-16 22:46:25	0	XYZ	1
\.


--
-- TOC entry 2913 (class 0 OID 24704)
-- Dependencies: 203
-- Data for Name: fsfirm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fsfirm (id, created_by, created_time_stamp, delete_status, modified_by, modified_time_stamp, version, name, my_referral_code, pancard, referred_by, registration_id, address, city, district, email_id, is_active, mobile_number, re_new_due_date, registration_date, state) FROM stdin;
27	FinS|9404682305	2022-02-05 15:17:33.528	f	FinS|8788246192	2022-02-08 20:08:51.007	6	FinS	\N	\N	\N	123	At post Loni	Udgir	Latur	muley.ramling@gmail.com	t	87882461934	\N	\N	Maharashtra
32	FinS|9404682305	2022-02-06 12:32:44.997	t	FinS|8788246192	2022-02-14 19:30:26.71	17	FirmTest124	\N	\N	\N	123	At post Loni	Udgir	Latur	muley.ramling@gmail.com	t	7777777788	\N	\N	Maharashtra
29	FinS|9404682305	2022-02-05 22:18:48.978	t	FinS|8788246192	2022-02-17 16:19:50.199	6	FinS123	\N	\N	\N	123	At post Loni	Udgir	Latur	muley.ramling@gmail.com	t	8888888888	\N	\N	Maharashtra
1	FinS | Ramling Muley	2021-11-16 22:46:25	f	FinS|8788246192	2022-02-17 16:28:21.922	3	FinS	\N	ABCDE1234F	\N	123	At post Loni6	Udgir	Latur	muley.ramling@gmail.com	t	8788246192	2021-11-16 22:46:25	2022-11-16 22:46:25	Maharashtra
\.


--
-- TOC entry 2917 (class 0 OID 24751)
-- Dependencies: 207
-- Data for Name: fslocation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fslocation (id, created_by, created_time_stamp, delete_status, modified_by, modified_time_stamp, version, address, city, firmid, name, state) FROM stdin;
\.


--
-- TOC entry 2921 (class 0 OID 25034)
-- Dependencies: 211
-- Data for Name: fsmenus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fsmenus (id, name) FROM stdin;
1	Firm
2	Employees
3	Customers
4	Locations
5	Designations
\.


--
-- TOC entry 2922 (class 0 OID 25039)
-- Dependencies: 212
-- Data for Name: fsrole; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fsrole (id, name) FROM stdin;
1	Master
2	Administrator
3	Regular
\.


--
-- TOC entry 2920 (class 0 OID 25024)
-- Dependencies: 210
-- Data for Name: fsstatecity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fsstatecity (id, city, district, state) FROM stdin;
2	Kankavli	Sindhudurg	Maharashtra
3	Vaibhavwadi	Sindhudurg	Maharashtra
4	Devgad	Sindhudurg	Maharashtra
5	Malwan	Sindhudurg	Maharashtra
6	Sawantwadi	Sindhudurg	Maharashtra
7	Kudal	Sindhudurg	Maharashtra
8	Vengurla	Sindhudurg	Maharashtra
9	Dodamarg	Sindhudurg	Maharashtra
10	Ratnagiri	Ratnagiri	Maharashtra
11	Sangameshwar	Ratnagiri	Maharashtra
12	Lanja	Ratnagiri	Maharashtra
13	Rajapur	Ratnagiri	Maharashtra
14	Chiplun	Ratnagiri	Maharashtra
15	Guhagar	Ratnagiri	Maharashtra
16	Dapoli	Ratnagiri	Maharashtra
17	Mandangad	Ratnagiri	Maharashtra
18	Khed	Ratnagiri	Maharashtra
19	Pen	Raigad	Maharashtra
20	Alibaug	Raigad	Maharashtra
21	Murud	Raigad	Maharashtra
22	Panvel	Raigad	Maharashtra
23	Uran	Raigad	Maharashtra
24	Karjat	Raigad	Maharashtra
25	Khalapur	Raigad	Maharashtra
26	Mangaon	Raigad	Maharashtra
27	Tala	Raigad	Maharashtra
28	Roha	Raigad	Maharashtra
29	Sudhagad	Raigad	Maharashtra
30	Mahad	Raigad	Maharashtra
31	Poladpur	Raigad	Maharashtra
32	Shrivardhan	Raigad	Maharashtra
33	Mhasla	Raigad	Maharashtra
34	Kurla	Mumbai	Maharashtra
35	Andheri	Mumbai	Maharashtra
36	Borivali	Mumbai	Maharashtra
37	Thane	Thane	Maharashtra
38	Kalyan	Thane	Maharashtra
39	Murbad	Thane	Maharashtra
40	Bhiwandi	Thane	Maharashtra
41	Shahapur	Thane	Maharashtra
42	Ulhasnagar	Thane	Maharashtra
43	Ambarnath	Thane	Maharashtra
44	Palghar	Palghar	Maharashtra
45	Vasai	Palghar	Maharashtra
46	Dahanu	Palghar	Maharashtra
47	Talasari	Palghar	Maharashtra
48	Jawhar	Palghar	Maharashtra
49	Mokhada	Palghar	Maharashtra
50	Vada	Palghar	Maharashtra
51	Vikramgad	Palghar	Maharashtra
52	Nashik	Nashik	Maharashtra
53	Igatpuri	Nashik	Maharashtra
54	Dindori	Nashik	Maharashtra
55	Peth	Nashik	Maharashtra
56	Trimbakeshwar	Nashik	Maharashtra
57	Kalwan	Nashik	Maharashtra
58	Deola	Nashik	Maharashtra
59	Surgana	Nashik	Maharashtra
60	Baglan	Nashik	Maharashtra
61	Malegaon	Nashik	Maharashtra
62	Nandgaon	Nashik	Maharashtra
63	Chandwad	Nashik	Maharashtra
64	Niphad	Nashik	Maharashtra
65	Sinnar	Nashik	Maharashtra
66	Yeola	Nashik	Maharashtra
67	Nandurbar	Nandurbar	Maharashtra
68	Navapur	Nandurbar	Maharashtra
69	Shahada	Nandurbar	Maharashtra
70	Talode	Nandurbar	Maharashtra
71	Akkalkuwa	Nandurbar	Maharashtra
72	Akrani	Nandurbar	Maharashtra
73	Dhule	Dhule	Maharashtra
74	Sakri	Dhule	Maharashtra
75	Sindkheda	Dhule	Maharashtra
76	Shirpur	Dhule	Maharashtra
77	Jalgaon	Jalgaon	Maharashtra
78	Jamner	Jalgaon	Maharashtra
79	Erandol	Jalgaon	Maharashtra
80	Dharangaon	Jalgaon	Maharashtra
81	Bhusawal	Jalgaon	Maharashtra
82	Raver	Jalgaon	Maharashtra
83	Muktainagar	Jalgaon	Maharashtra
84	Bodwad	Jalgaon	Maharashtra
85	Yawal	Jalgaon	Maharashtra
86	Amalner	Jalgaon	Maharashtra
87	Parola	Jalgaon	Maharashtra
88	Chopda	Jalgaon	Maharashtra
89	Pachora	Jalgaon	Maharashtra
90	Bhadgaon	Jalgaon	Maharashtra
91	Chalisgaon	Jalgaon	Maharashtra
92	Buldhana	Buldhana	Maharashtra
93	Chikhli	Buldhana	Maharashtra
94	Deulgaon Raja	Buldhana	Maharashtra
95	Jalgaon Jamod	Buldhana	Maharashtra
96	Sangrampur	Buldhana	Maharashtra
97	Malkapur	Buldhana	Maharashtra
98	Motala	Buldhana	Maharashtra
99	Nandura	Buldhana	Maharashtra
100	Khamgaon	Buldhana	Maharashtra
101	Shegaon	Buldhana	Maharashtra
102	Mehkar	Buldhana	Maharashtra
103	Sindkhed Raja	Buldhana	Maharashtra
104	Lonar	Buldhana	Maharashtra
105	Akola	Akola	Maharashtra
106	Akot	Akola	Maharashtra
107	Telhara	Akola	Maharashtra
108	Balapur	Akola	Maharashtra
109	Patur	Akola	Maharashtra
110	Murtajapur	Akola	Maharashtra
111	Barshitakli	Akola	Maharashtra
112	Washim	Washim	Maharashtra
113	Malegaon	Washim	Maharashtra
114	Risod	Washim	Maharashtra
115	Mangrulpir	Washim	Maharashtra
116	Karanja	Washim	Maharashtra
117	Manora	Washim	Maharashtra
118	Amravati	Amravati	Maharashtra
119	Bhatukali	Amravati	Maharashtra
120	Nandgaon Khandeshwar	Amravati	Maharashtra
121	Dharni	Amravati	Maharashtra
122	Chikhaldara	Amravati	Maharashtra
123	Achalpur	Amravati	Maharashtra
124	Chandurbazar	Amravati	Maharashtra
125	Morshi	Amravati	Maharashtra
126	Warud	Amravati	Maharashtra
127	Daryapur	Amravati	Maharashtra
128	Anjangaon-Surji	Amravati	Maharashtra
129	Chandur	Amravati	Maharashtra
130	Dhamangaon	Amravati	Maharashtra
131	Tiosa	Amravati	Maharashtra
132	Wardha	Wardha	Maharashtra
133	Deoli	Wardha	Maharashtra
134	Seloo	Wardha	Maharashtra
135	Arvi	Wardha	Maharashtra
136	Ashti	Wardha	Maharashtra
137	Karanja	Wardha	Maharashtra
138	Hinganghat	Wardha	Maharashtra
139	Samudrapur	Wardha	Maharashtra
140	Nagpur Urban	Nagpur	Maharashtra
141	Nagpur Rural	Nagpur	Maharashtra
142	Kamptee	Nagpur	Maharashtra
143	Hingna	Nagpur	Maharashtra
144	Katol	Nagpur	Maharashtra
145	Narkhed	Nagpur	Maharashtra
146	Savner	Nagpur	Maharashtra
147	Kalameshwar	Nagpur	Maharashtra
148	Ramtek	Nagpur	Maharashtra
149	Mouda	Nagpur	Maharashtra
150	Parseoni	Nagpur	Maharashtra
151	Umred	Nagpur	Maharashtra
152	Kuhi	Nagpur	Maharashtra
153	Bhiwapur	Nagpur	Maharashtra
154	Bhandara	Bhandara	Maharashtra
155	Tumsar	Bhandara	Maharashtra
156	Pauni	Bhandara	Maharashtra
157	Mohadi	Bhandara	Maharashtra
158	Sakoli	Bhandara	Maharashtra
159	Lakhni	Bhandara	Maharashtra
160	Lakhandur	Bhandara	Maharashtra
161	Gondia	Gondia	Maharashtra
162	Tirora	Gondia	Maharashtra
163	Goregaon	Gondia	Maharashtra
164	Arjuni Morgaon	Gondia	Maharashtra
165	Amgaon	Gondia	Maharashtra
166	Salekasa	Gondia	Maharashtra
167	Sadak Arjuni	Gondia	Maharashtra
168	Deori	Gondia	Maharashtra
169	Gadchiroli	Gadchiroli	Maharashtra
170	Dhanora	Gadchiroli	Maharashtra
171	Chamorshi	Gadchiroli	Maharashtra
172	Mulchera	Gadchiroli	Maharashtra
173	Desaiganj	Gadchiroli	Maharashtra
174	Armori	Gadchiroli	Maharashtra
175	Kurkheda	Gadchiroli	Maharashtra
176	Korchi	Gadchiroli	Maharashtra
177	Aheri	Gadchiroli	Maharashtra
178	Bhamragad	Gadchiroli	Maharashtra
179	Sironcha	Gadchiroli	Maharashtra
180	Chandrapur	Chandrapur	Maharashtra
181	Saoli	Chandrapur	Maharashtra
182	Mul	Chandrapur	Maharashtra
183	Ballarpur	Chandrapur	Maharashtra
184	Pombhurna	Chandrapur	Maharashtra
185	Gondpimpri	Chandrapur	Maharashtra
186	Warora	Chandrapur	Maharashtra
187	Chimur	Chandrapur	Maharashtra
188	Bhadravati	Chandrapur	Maharashtra
189	Bramhapuri	Chandrapur	Maharashtra
190	Nagbhid	Chandrapur	Maharashtra
191	Sindewahi	Chandrapur	Maharashtra
192	Rajura	Chandrapur	Maharashtra
193	Korpana	Chandrapur	Maharashtra
194	Jivati	Chandrapur	Maharashtra
195	Yavatmal	Yavatmal	Maharashtra
196	Arni	Yavatmal	Maharashtra
197	Babhulgaon	Yavatmal	Maharashtra
198	Kalamb	Yavatmal	Maharashtra
199	Darwha	Yavatmal	Maharashtra
200	Digras	Yavatmal	Maharashtra
201	Ner	Yavatmal	Maharashtra
202	Pusad	Yavatmal	Maharashtra
203	Umarkhed	Yavatmal	Maharashtra
204	Mahagaon	Yavatmal	Maharashtra
205	Kelapur	Yavatmal	Maharashtra
206	Ralegaon	Yavatmal	Maharashtra
207	Ghatanji	Yavatmal	Maharashtra
208	Wani	Yavatmal	Maharashtra
209	Maregaon	Yavatmal	Maharashtra
210	Zari Jamani	Yavatmal	Maharashtra
211	Nanded	Nanded	Maharashtra
212	Ardhapur	Nanded	Maharashtra
213	Mudkhed	Nanded	Maharashtra
214	Bhokar	Nanded	Maharashtra
215	Umri	Nanded	Maharashtra
216	Loha	Nanded	Maharashtra
217	Kandhar	Nanded	Maharashtra
218	Kinwat	Nanded	Maharashtra
219	Himayatnagar	Nanded	Maharashtra
220	Hadgaon	Nanded	Maharashtra
221	Mahur	Nanded	Maharashtra
222	Deglur	Nanded	Maharashtra
223	Mukhed	Nanded	Maharashtra
224	Dharmabad	Nanded	Maharashtra
225	Biloli	Nanded	Maharashtra
226	Naigaon	Nanded	Maharashtra
227	Hingoli	Hingoli	Maharashtra
228	Sengaon	Hingoli	Maharashtra
229	Kalamnuri	Hingoli	Maharashtra
230	Basmath	Hingoli	Maharashtra
231	Aundha Nagnath	Hingoli	Maharashtra
232	Parbhani	Parbhani	Maharashtra
233	Sonpeth	Parbhani	Maharashtra
234	Gangakhed	Parbhani	Maharashtra
235	Palam	Parbhani	Maharashtra
236	Purna	Parbhani	Maharashtra
237	Sailu	Parbhani	Maharashtra
238	Jintur	Parbhani	Maharashtra
239	Manwath	Parbhani	Maharashtra
240	Pathri	Parbhani	Maharashtra
241	Jalna	Jalna	Maharashtra
242	Bhokardan	Jalna	Maharashtra
243	Jafrabad	Jalna	Maharashtra
244	Badnapur	Jalna	Maharashtra
245	Ambad	Jalna	Maharashtra
246	Ghansawangi	Jalna	Maharashtra
247	Partur	Jalna	Maharashtra
248	Mantha	Jalna	Maharashtra
249	Aurangabad	Aurangabad	Maharashtra
250	Kannad	Aurangabad	Maharashtra
251	Soegaon	Aurangabad	Maharashtra
252	Sillod	Aurangabad	Maharashtra
253	Phulambri	Aurangabad	Maharashtra
254	Khuldabad	Aurangabad	Maharashtra
255	Vaijapur	Aurangabad	Maharashtra
256	Gangapur	Aurangabad	Maharashtra
257	Paithan	Aurangabad	Maharashtra
258	Beed	Beed	Maharashtra
259	Ashti	Beed	Maharashtra
260	Patoda	Beed	Maharashtra
261	ShirurKasar	Beed	Maharashtra
262	Georai	Beed	Maharashtra
263	Majalgaon	Beed	Maharashtra
264	Wadwani	Beed	Maharashtra
265	Kaij	Beed	Maharashtra
266	Dharur	Beed	Maharashtra
267	Parli	Beed	Maharashtra
268	Ambejogai	Beed	Maharashtra
269	Latur	Latur	Maharashtra
270	Renapur	Latur	Maharashtra
271	Ahmedpur	Latur	Maharashtra
272	Jalkot	Latur	Maharashtra
273	Chakur	Latur	Maharashtra
274	Shirur Anantpal	Latur	Maharashtra
275	Ausa	Latur	Maharashtra
276	Nilanga	Latur	Maharashtra
277	Deoni	Latur	Maharashtra
278	Udgir	Latur	Maharashtra
279	Osmanabad	Osmanabad	Maharashtra
280	Tuljapur	Osmanabad	Maharashtra
281	Bhum	Osmanabad	Maharashtra
282	Paranda	Osmanabad	Maharashtra
283	Washi	Osmanabad	Maharashtra
284	Kalamb	Osmanabad	Maharashtra
285	Lohara	Osmanabad	Maharashtra
286	Umarga	Osmanabad	Maharashtra
287	Solapur North	Solapur	Maharashtra
288	Barshi	Solapur	Maharashtra
289	Solapur South	Solapur	Maharashtra
290	Akkalkot	Solapur	Maharashtra
291	Madha	Solapur	Maharashtra
292	Karmala	Solapur	Maharashtra
293	Pandharpur	Solapur	Maharashtra
294	Mohol	Solapur	Maharashtra
295	Malshiras	Solapur	Maharashtra
296	Sangole	Solapur	Maharashtra
297	Mangalvedhe	Solapur	Maharashtra
298	Nagar	Ahmednagar	Maharashtra
299	Shevgaon	Ahmednagar	Maharashtra
300	Pathardi	Ahmednagar	Maharashtra
301	Parner	Ahmednagar	Maharashtra
302	Sangamner	Ahmednagar	Maharashtra
303	Kopargaon	Ahmednagar	Maharashtra
304	Akole	Ahmednagar	Maharashtra
305	Shrirampur	Ahmednagar	Maharashtra
306	Nevasa	Ahmednagar	Maharashtra
307	Rahata	Ahmednagar	Maharashtra
308	Rahuri	Ahmednagar	Maharashtra
309	Shrigonda	Ahmednagar	Maharashtra
310	Karjat	Ahmednagar	Maharashtra
311	Jamkhed	Ahmednagar	Maharashtra
312	Pune City	Pune	Maharashtra
313	Haveli	Pune	Maharashtra
314	Khed Rajgurunagar	Pune	Maharashtra
315	Junnar	Pune	Maharashtra
316	Ambegaon Ghodegaon	Pune	Maharashtra
317	Maval Vadgaon	Pune	Maharashtra
318	Mulshi Paud	Pune	Maharashtra
319	Shirur	Pune	Maharashtra
320	Purandhar Saswad	Pune	Maharashtra
321	Velhe	Pune	Maharashtra
322	Bhor	Pune	Maharashtra
323	Baramati	Pune	Maharashtra
324	Indapur	Pune	Maharashtra
325	Daund	Pune	Maharashtra
326	Satara	Satara	Maharashtra
327	Jaoli	Satara	Maharashtra
328	Koregaon	Satara	Maharashtra
329	Wai	Satara	Maharashtra
330	Mahabaleshwar	Satara	Maharashtra
331	Khandala	Satara	Maharashtra
332	Phaltan	Satara	Maharashtra
333	Maan Dahiwadi	Satara	Maharashtra
334	Khatav Vaduj	Satara	Maharashtra
335	Patan	Satara	Maharashtra
336	Karad	Satara	Maharashtra
337	Miraj	Sangli	Maharashtra
338	Kavathe Mahankal	Sangli	Maharashtra
339	Tasgaon	Sangli	Maharashtra
340	Jat	Sangli	Maharashtra
341	Walwa Islampur	Sangli	Maharashtra
342	Shirala	Sangli	Maharashtra
343	Khanapur Vita	Sangli	Maharashtra
344	Atpadi	Sangli	Maharashtra
345	Palus	Sangli	Maharashtra
346	Kadegaon	Sangli	Maharashtra
347	Karvir	Kolhapur	Maharashtra
348	Panhala	Kolhapur	Maharashtra
349	Shahuwadi	Kolhapur	Maharashtra
350	Kagal	Kolhapur	Maharashtra
351	Hatkanangale	Kolhapur	Maharashtra
352	Shirol	Kolhapur	Maharashtra
353	Radhanagari	Kolhapur	Maharashtra
354	Gaganbawada	Kolhapur	Maharashtra
355	Bhudargad	Kolhapur	Maharashtra
356	Gadhinglaj	Kolhapur	Maharashtra
357	Chandgad	Kolhapur	Maharashtra
358	Ajra	Kolhapur	Maharashtra
\.


--
-- TOC entry 2914 (class 0 OID 24713)
-- Dependencies: 204
-- Data for Name: fsuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fsuser (id, created_by, created_time_stamp, delete_status, modified_by, modified_time_stamp, version, password, firmid, middle_name, user_profile_img, designation_id, aadhar, address, blood_group, city, confirm_password, ctc, date_of_birth, date_of_joining, district, emial_id, first_name, last_name, login_name, mobile_number, state, user_code, last_login) FROM stdin;
42	Admin	2022-02-06 22:58:16.161	f	Admin	2022-02-06 22:58:16.161	0	7777777777	32	\N	\N	\N	\N	At post Loni	\N	Udgir	7777777777	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	7777777777	7777777777	Maharashtra	\N	\N
2	FinS | Ramling Muley	2021-11-16 22:47:25	f	FinS|8788246192	2022-01-26 17:09:35.441	6	12345	1	S	\N	\N	111122223333	At Post Loni	o+	Udgir	12345	1.00	1988-05-02 00:00:00	2021-11-16 22:47:25	Latur	muley.ramling@gmail.com	Ramling	Muley	8788246192	8788246195	Maharashtra	F1E2	2022-01-26 17:09:34.261
43	Admin	2022-02-07 22:47:57.847	f	Admin	2022-02-07 22:47:57.847	0	8788246192	1	\N	\N	\N	\N	At post Loni	\N	Udgir	8788246192	\N	\N	\N	Latur1	muley.ramling@gmail.com	\N	\N	8788246196	8788246196	Maharashtra	\N	\N
44	Admin	2022-02-08 12:19:01.672	f	Admin	2022-02-08 12:19:01.672	0	7777777788	32	\N	\N	\N	\N	At post Loni	\N	Udgir	7777777788	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	7777777788	7777777788	Maharashtra	\N	\N
45	Admin	2022-02-08 13:05:47.27	f	Admin	2022-02-08 13:05:47.27	0	87882461934	27	\N	\N	\N	\N	At post Loni	\N	Udgir	87882461934	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	87882461934	87882461934	Maharashtra	\N	\N
46	Admin	2022-02-08 18:03:42.198	f	Admin	2022-02-08 18:03:42.198	0	87882461934	27	\N	\N	\N	\N	At post Loni	\N	Udgir	87882461934	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	87882461934	87882461934	Maharashtra	\N	\N
47	Admin	2022-02-08 18:08:08.788	f	Admin	2022-02-08 18:08:08.788	0	87882461934	27	\N	\N	\N	\N	At post Loni	\N	Udgir	87882461934	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	87882461934	87882461934	Maharashtra	\N	\N
48	Admin	2022-02-08 19:04:14.773	f	Admin	2022-02-08 19:04:14.773	0	87882461934	27	\N	\N	\N	\N	At post Loni	\N	Udgir	87882461934	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	87882461934	87882461934	Maharashtra	\N	\N
49	Admin	2022-02-08 19:06:36.266	f	Admin	2022-02-08 19:06:36.266	0	8888888888	29	\N	\N	\N	\N	At post Loni	\N	Udgir	8888888888	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	8888888888	8888888888	Maharashtra	\N	\N
50	FinS|8788246192	2022-02-08 20:08:54.082	f	FinS|8788246192	2022-02-08 20:08:54.082	0	87882461934	27	\N	\N	\N	\N	At post Loni	\N	Udgir	87882461934	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	87882461934	87882461934	Maharashtra	\N	\N
4	FinS|8788246192	2021-11-19 16:05:16.233	f	FinS|8788246192	2021-11-19 16:05:16.233	0	12345	1	B	\N	\N	111122223333	At Post Togar	o+	Udgir	12345	1.00	1988-05-02 00:00:00	2021-11-16 22:47:25	Latur	ravimahada13@gmail.com	Ramesh	Mahada	9404682305	9404682305	Maharashtra	F1Enull	\N
28	FinS|9404682305	2022-02-05 15:17:43.518	f	FinS|9404682305	2022-02-05 15:17:43.518	0	8788246193	27	\N	\N	\N	\N	At post Loni	\N	Udgir	8788246193	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	8788246193	8788246193	Maharashtra	\N	\N
30	FinS|9404682305	2022-02-05 22:18:49.062	f	FinS|9404682305	2022-02-05 22:18:49.062	0	8788246193	29	\N	\N	\N	\N	At post Loni	\N	Udgir	8788246193	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	8788246193	8788246193	Maharashtra	\N	\N
31	FinS|9404682305	2022-02-05 22:20:55.027	f	FinS|9404682305	2022-02-05 22:20:55.027	0	999999999	29	\N	\N	\N	\N	At post Loni	\N	Udgir	999999999	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	999999999	999999999	Maharashtra	\N	\N
33	FinS|9404682305	2022-02-06 12:32:45.006	f	FinS|9404682305	2022-02-06 12:32:45.006	0	8788246194	32	\N	\N	\N	\N	At post Loni	\N	Udgir	8788246194	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	8788246194	8788246194	Maharashtra	\N	\N
34	FinS|9404682305	2022-02-06 12:35:48.762	f	FinS|9404682305	2022-02-06 12:35:48.762	0	999999999	32	\N	\N	\N	\N	At post Loni	\N	Udgir	999999999	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	999999999	999999999	Maharashtra	\N	\N
35	FinS|9404682305	2022-02-06 14:46:40.434	f	FinS|9404682305	2022-02-06 14:46:40.434	0	999999999	32	\N	\N	\N	\N	At post Loni	\N	Udgir	999999999	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	999999999	999999999	Maharashtra	\N	\N
36	FinS|9404682305	2022-02-06 14:54:27.622	f	FinS|9404682305	2022-02-06 14:54:27.622	0	999999999	32	\N	\N	\N	\N	At post Loni	\N	Udgir	999999999	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	999999999	999999999	Maharashtra	\N	\N
37	FinS|9404682305	2022-02-06 14:57:01.972	f	FinS|9404682305	2022-02-06 14:57:01.972	0	999999999	32	\N	\N	\N	\N	At post Loni	\N	Udgir	999999999	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	999999999	999999999	Maharashtra	\N	\N
38	FinS|9404682305	2022-02-06 15:09:28.348	f	FinS|9404682305	2022-02-06 15:09:28.348	0	999999999	32	\N	\N	\N	\N	At post Loni	\N	Udgir	999999999	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	999999999	999999999	Maharashtra	\N	\N
39	FinS|9404682305	2022-02-06 22:19:32.801	f	FinS|9404682305	2022-02-06 22:19:32.801	0	999999999	32	\N	\N	\N	\N	At post Loni	\N	Udgir	999999999	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	999999999	999999999	Maharashtra	\N	\N
40	FinS|9404682305	2022-02-06 22:19:55.079	f	FinS|9404682305	2022-02-06 22:19:55.079	0	999999999	32	\N	\N	\N	\N	At post Loni	\N	Udgir	999999999	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	999999999	999999999	Maharashtra	\N	\N
41	Admin	2022-02-06 22:57:47.569	f	Admin	2022-02-06 22:57:47.569	0	8888888888	29	\N	\N	\N	\N	At post Loni	\N	Udgir	8888888888	\N	\N	\N	Latur	muley.ramling@gmail.com	\N	\N	8888888888	8888888888	Maharashtra	\N	\N
\.


--
-- TOC entry 2923 (class 0 OID 25044)
-- Dependencies: 213
-- Data for Name: roles_menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles_menus (role_id, menus_id) FROM stdin;
1	1
2	2
2	3
3	3
2	4
2	5
3	4
\.


--
-- TOC entry 2915 (class 0 OID 24729)
-- Dependencies: 205
-- Data for Name: spring_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spring_session (primary_id, session_id, creation_time, last_access_time, max_inactive_interval, expiry_time, principal_name) FROM stdin;
\.


--
-- TOC entry 2916 (class 0 OID 24737)
-- Dependencies: 206
-- Data for Name: spring_session_attributes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spring_session_attributes (session_primary_id, attribute_name, attribute_bytes) FROM stdin;
\.


--
-- TOC entry 2924 (class 0 OID 25047)
-- Dependencies: 214
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_roles (user_id, role_id) FROM stdin;
4	1
2	1
28	2
30	2
31	2
33	2
34	2
35	2
36	2
37	2
38	2
39	2
40	2
41	2
42	2
43	2
44	2
45	2
46	2
47	2
48	2
49	2
50	2
\.


--
-- TOC entry 2931 (class 0 OID 0)
-- Dependencies: 208
-- Name: fsStaticDataSeq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."fsStaticDataSeq"', 358, true);


--
-- TOC entry 2932 (class 0 OID 0)
-- Dependencies: 202
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hibernate_sequence', 50, true);


--
-- TOC entry 2760 (class 2606 OID 24996)
-- Name: fsdesignation fsdesignation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsdesignation
    ADD CONSTRAINT fsdesignation_pkey PRIMARY KEY (id);


--
-- TOC entry 2774 (class 2606 OID 41671)
-- Name: fsexpensetype fsexpensetype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsexpensetype
    ADD CONSTRAINT fsexpensetype_pkey PRIMARY KEY (id);


--
-- TOC entry 2747 (class 2606 OID 24712)
-- Name: fsfirm fsfirm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsfirm
    ADD CONSTRAINT fsfirm_pkey PRIMARY KEY (id);


--
-- TOC entry 2758 (class 2606 OID 24759)
-- Name: fslocation fslocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fslocation
    ADD CONSTRAINT fslocation_pkey PRIMARY KEY (id);


--
-- TOC entry 2766 (class 2606 OID 25038)
-- Name: fsmenus fsmenus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsmenus
    ADD CONSTRAINT fsmenus_pkey PRIMARY KEY (id);


--
-- TOC entry 2770 (class 2606 OID 25043)
-- Name: fsrole fsrole_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsrole
    ADD CONSTRAINT fsrole_pkey PRIMARY KEY (id);


--
-- TOC entry 2762 (class 2606 OID 25031)
-- Name: fsstatecity fsstatecity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsstatecity
    ADD CONSTRAINT fsstatecity_pkey PRIMARY KEY (id);


--
-- TOC entry 2749 (class 2606 OID 24721)
-- Name: fsuser fsuser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsuser
    ADD CONSTRAINT fsuser_pkey PRIMARY KEY (id);


--
-- TOC entry 2756 (class 2606 OID 24744)
-- Name: spring_session_attributes spring_session_attributes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spring_session_attributes
    ADD CONSTRAINT spring_session_attributes_pk PRIMARY KEY (session_primary_id, attribute_name);


--
-- TOC entry 2754 (class 2606 OID 24733)
-- Name: spring_session spring_session_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spring_session
    ADD CONSTRAINT spring_session_pk PRIMARY KEY (primary_id);


--
-- TOC entry 2772 (class 2606 OID 25053)
-- Name: fsrole ukbcxce9t0t1d1um3jyjrdn3bes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsrole
    ADD CONSTRAINT ukbcxce9t0t1d1um3jyjrdn3bes UNIQUE (name, id);


--
-- TOC entry 2768 (class 2606 OID 25051)
-- Name: fsmenus ukdh1sx1fsa1nfxsw8tdxrfq95s; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsmenus
    ADD CONSTRAINT ukdh1sx1fsa1nfxsw8tdxrfq95s UNIQUE (name, id);


--
-- TOC entry 2764 (class 2606 OID 25033)
-- Name: fsstatecity ukrdea9l08yvjfvim2o8g2db3so; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsstatecity
    ADD CONSTRAINT ukrdea9l08yvjfvim2o8g2db3so UNIQUE (state, district, city);


--
-- TOC entry 2750 (class 1259 OID 24734)
-- Name: spring_session_ix1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX spring_session_ix1 ON public.spring_session USING btree (session_id);


--
-- TOC entry 2751 (class 1259 OID 24735)
-- Name: spring_session_ix2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX spring_session_ix2 ON public.spring_session USING btree (expiry_time);


--
-- TOC entry 2752 (class 1259 OID 24736)
-- Name: spring_session_ix3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX spring_session_ix3 ON public.spring_session USING btree (principal_name);


--
-- TOC entry 2785 (class 2606 OID 41672)
-- Name: fsexpensetype fk1ncy8cv5b8bcxue7868gp7l08; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsexpensetype
    ADD CONSTRAINT fk1ncy8cv5b8bcxue7868gp7l08 FOREIGN KEY (firmid) REFERENCES public.fsfirm(id);


--
-- TOC entry 2784 (class 2606 OID 25069)
-- Name: users_roles fk1wmg76jwd40ji1klbkmw5dfy9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fk1wmg76jwd40ji1klbkmw5dfy9 FOREIGN KEY (user_id) REFERENCES public.fsuser(id);


--
-- TOC entry 2780 (class 2606 OID 25012)
-- Name: fsdesignation fk521o9gldl7kq5q1s9ssqp74yg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsdesignation
    ADD CONSTRAINT fk521o9gldl7kq5q1s9ssqp74yg FOREIGN KEY (user_id) REFERENCES public.fsuser(id);


--
-- TOC entry 2776 (class 2606 OID 25017)
-- Name: fsuser fk8y622c43nss76knb869i4fyl7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsuser
    ADD CONSTRAINT fk8y622c43nss76knb869i4fyl7 FOREIGN KEY (designation_id) REFERENCES public.fsdesignation(id);


--
-- TOC entry 2781 (class 2606 OID 25054)
-- Name: roles_menus fkf8wjap0al1c08o4x3jnwxym7q; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_menus
    ADD CONSTRAINT fkf8wjap0al1c08o4x3jnwxym7q FOREIGN KEY (menus_id) REFERENCES public.fsmenus(id);


--
-- TOC entry 2783 (class 2606 OID 25064)
-- Name: users_roles fklftn0eg8gjkwts49ebrbuhsow; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fklftn0eg8gjkwts49ebrbuhsow FOREIGN KEY (role_id) REFERENCES public.fsrole(id);


--
-- TOC entry 2782 (class 2606 OID 25059)
-- Name: roles_menus fkme6v604cuqc9shirt5ru1ydpu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_menus
    ADD CONSTRAINT fkme6v604cuqc9shirt5ru1ydpu FOREIGN KEY (role_id) REFERENCES public.fsrole(id);


--
-- TOC entry 2779 (class 2606 OID 25007)
-- Name: fsdesignation fkmgypglob2voj8rflxxvwt3r7x; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsdesignation
    ADD CONSTRAINT fkmgypglob2voj8rflxxvwt3r7x FOREIGN KEY (firmid) REFERENCES public.fsfirm(id);


--
-- TOC entry 2778 (class 2606 OID 24760)
-- Name: fslocation fkosvfwugj94cm2587nlg17bdwf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fslocation
    ADD CONSTRAINT fkosvfwugj94cm2587nlg17bdwf FOREIGN KEY (firmid) REFERENCES public.fsfirm(id);


--
-- TOC entry 2775 (class 2606 OID 24724)
-- Name: fsuser fkqwqueowsro7cuvq04gsjg5vjj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fsuser
    ADD CONSTRAINT fkqwqueowsro7cuvq04gsjg5vjj FOREIGN KEY (firmid) REFERENCES public.fsfirm(id);


--
-- TOC entry 2777 (class 2606 OID 24745)
-- Name: spring_session_attributes spring_session_attributes_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spring_session_attributes
    ADD CONSTRAINT spring_session_attributes_fk FOREIGN KEY (session_primary_id) REFERENCES public.spring_session(primary_id) ON DELETE CASCADE;


-- Completed on 2022-02-17 17:15:11

--
-- PostgreSQL database dump complete
--

