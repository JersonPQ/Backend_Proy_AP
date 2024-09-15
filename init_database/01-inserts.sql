USE proinvest;

-- Insertar roles de usuarios
INSERT INTO RolUsuarios (nombre_rol) VALUES ('Administrador'), ('Usuario');

-- Insertar categorías
INSERT INTO Categorias (nombre_categoria) VALUES ('Educación'), ('Salud'), ('Tecnología'), ('Medio Ambiente'), ('Deportes');

-- Insertar tipos de notificaciones
INSERT INTO TiposNotificaciones (nombre_tipo_notificacion) VALUES ('Nuevo proyecto'), ('Proyecto financiado'), ('Proyecto no financiado');

-- Insertar usuarios de prueba
--ID:1
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Admin Admin', '123456789', 'prueba@estudiantec.cr', 'Administración', 0, '12345678', '123456', 1);
--ID:2
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Usuario Prueba', '987654321', 'prueba2@estudiantec.cr', 'Desarrollo', 0, '87654321', '123456', 2);


--Más inserts de usuarios de prueba (Creadores de Proyectos)
--ID:3
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Carl Sagan', '123456789', 'sagan.c@estudiantec.cr', 'Ingeniería en Física Espacial', 0, '87654321', '123456', 2);
--ID:4
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Stephen Hawking', '234567890', 'hawking.s@estudiantec.cr', 'Física Teórica e Ingeniería Computacional', 0, '98765432', '123456', 2);
--ID:5
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Neil Armstrong', '345678901', 'armstrong.n@estudiantec.cr', 'Ingeniería Aeroespacial y Computacional', 0, '99887766', '123456', 2);

--Más inserts de usuarios de prueba (Donadores)
--ID:6
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Bruce Wayne', '123456789', 'wayne.b@estudiantec.cr', 'Ingeniería Industrial y Tecnología', 0, '88887777', '123456', 2);
--ID:7
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Clark Kent', '234567890', 'kent.c@estudiantec.cr', 'Ingeniería Eléctrica', 0, '77776666', '123456', 2);
--ID:8
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Diana Prince', '345678901', 'prince.d@estudiantec.cr', 'Ingeniería Civil y Estructural', 0, '66665555', '123456', 2);
--ID:9
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Barry Allen', '456789012', 'allen.b@estudiantec.cr', 'Ingeniería en Sistemas y Computación', 0, '55554444', '123456', 2);
--ID:10
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Victor Stone', '567890123', 'stone.v@estudiantec.cr', 'Ingeniería en Robótica', 0, '44443333', '123456', 2);





-- Insertar proyectos
--ID:1 - Educación
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (1, 'Educación Digital Global', 'Un programa innovador que ofrece educación en línea gratuita a estudiantes en países en desarrollo.', 15000, '2024-12-31', 1, 'https://via.placeholder.com/150', '2024-08-15');

--ID:2 - Tecnología
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (2, 'Artemis Program', 'Programa de la NASA para devolver astronautas a la Luna y preparar la exploración de Marte.', 499000, '2025-12-01', 3, 'https://via.placeholder.com/150', '2024-05-10');

--ID:3 - Tecnología
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (3, 'James Webb Space Telescope', 'Telescopio espacial de próxima generación para estudiar las galaxias más antiguas del universo.', 12000, '2023-06-15', 3, 'https://via.placeholder.com/150', '2023-01-05');

--ID:4 - Salud
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (4, 'Sistema Avanzado de Telemedicina', 'Plataforma que conecta a médicos y pacientes de forma remota, utilizando IA para diagnósticos tempranos.', 20000, '2025-01-15', 2, 'https://via.placeholder.com/150', '2024-06-20');

--ID:5 - Medio Ambiente
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (5, 'Reforestación Inteligente', 'Proyecto de reforestación con drones para plantar árboles en áreas afectadas por la deforestación.', 45000, '2024-06-01', 4, 'https://via.placeholder.com/150', '2023-12-15');

--ID:6 - Tecnología
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (2, 'Lunar Gateway', 'Estación espacial planificada en órbita alrededor de la Luna como parte del programa Artemis.', 499000, '2027-07-01', 3, 'https://via.placeholder.com/150', '2024-07-10');

--ID:7 - Medio Ambiente
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (3, 'Desalinización Solar', 'Tecnología innovadora para convertir agua de mar en potable utilizando energía solar.', 75000, '2034-09-01', 4, 'https://via.placeholder.com/150', '2024-08-20');

--ID:8 - Salud
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (4, 'Vacunas Personalizadas', 'Desarrollo de vacunas personalizadas basadas en el perfil genético de los pacientes.', 95000, '2030-03-01', 2, 'https://via.placeholder.com/150', '2024-07-05');

--ID:9 - Deportes
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (5, 'Deportes con Energía Renovable', 'Creación de estadios deportivos autosuficientes energéticamente utilizando energía solar y eólica.', 12000, '2025-11-01', 5, 'https://via.placeholder.com/150', '2024-03-25');

--ID:10 - Medio Ambiente
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (2, 'Reciclaje de Plástico con Biotecnología', 'Uso de enzimas y biotecnología para descomponer plásticos no reciclables.', 150000, '2023-09-24', 4, 'https://via.placeholder.com/150', '2023-05-10');

--ID:11 - Educación
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos, fecha_creacion)
VALUES (3, 'Plataforma Educativa de Realidad Virtual', 'Una plataforma que permite a los estudiantes aprender usando simulaciones de realidad virtual.', 50000, '2025-12-01', 1, 'https://via.placeholder.com/150', '2024-02-18');



-- Insertar donaciones
INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (6, 1, 5000, '2024-08-20');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (7, 2, 7500, '2024-05-15');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (8, 3, 3000, '2023-01-10');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (9, 4, 18000, '2024-06-25');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (10, 5, 12000, '2023-12-20');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (6, 6, 9500, '2024-07-15');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (7, 7, 4000, '2024-08-25');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (8, 8, 11000, '2024-07-10');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (9, 9, 5000, '2024-03-30');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (10, 10, 13000, '2023-05-15');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (6, 11, 17000, '2024-02-23');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (7, 1, 4500, '2024-08-20');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (8, 2, 7000, '2024-05-15');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (9, 3, 10500, '2023-01-10');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (10, 4, 6000, '2024-06-25');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (6, 5, 8500, '2023-12-20');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (7, 6, 14500, '2024-07-15');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (8, 7, 18000, '2024-08-25');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (9, 8, 9500, '2024-07-10');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (10, 9, 7500, '2024-03-30');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (6, 10, 12000, '2023-05-15');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (7, 11, 6500, '2024-02-23');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (8, 1, 13500, '2024-08-20');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (9, 2, 11000, '2024-05-15');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (10, 3, 5500, '2023-01-10');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (6, 4, 9500, '2024-06-25');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (7, 5, 16000, '2023-12-20');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (8, 6, 17500, '2024-07-15');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (9, 7, 4800, '2024-08-25');

INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado, fecha_donacion)
VALUES (10, 8, 14000, '2024-07-10');



-- Insertar notificaciones
INSERT INTO Notificaciones (id_usuario, id_tipo_notificacion, contenido)
VALUES (1, 1, 'Nuevo proyecto de prueba creado');
