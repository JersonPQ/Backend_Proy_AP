USE proinvest;

-- Insertar roles de usuarios
INSERT INTO RolUsuarios (nombre_rol) VALUES ('Administrador'), ('Usuario');

-- Insertar categorías
INSERT INTO Categorias (nombre_categoria) VALUES ('Educación'), ('Salud'), ('Tecnología'), ('Medio Ambiente'), ('Deportes');

-- Insertar tipos de notificaciones
INSERT INTO TiposNotificaciones (nombre_tipo_notificacion) VALUES ('Nuevo proyecto'), ('Proyecto financiado'), ('Proyecto no financiado');

-- Insertar usuarios
INSERT INTO Usuarios (nombre_completo, cedula, correo_electronico, area_trabajo, cartera_digital, telefono, contrasena, rol)
VALUES ('Admin Admin', '123456789', 'prueba@estudiantec.cr', 'Administración', 0, '12345678', '123456', 1);

-- Insertar proyectos
INSERT INTO Proyectos (id_usuario, nombre_proyecto, descripcion, objetivo_financiacion, fecha_limite, categoria_id, imagenes_videos)
VALUES (1, 'Proyecto de prueba', 'Descripción del proyecto de prueba', 1000, '2022-12-31', 1, 'https://via.placeholder.com/150');

-- Insertar donaciones
INSERT INTO Donaciones (id_usuario, id_proyecto, monto_donado)
VALUES (1, 1, 500);

-- Insertar notificaciones
INSERT INTO Notificaciones (id_usuario, id_tipo_notificacion, contenido)
VALUES (1, 1, 'Nuevo proyecto de prueba creado');