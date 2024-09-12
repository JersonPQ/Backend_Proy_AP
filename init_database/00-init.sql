CREATE DATABASE IF NOT EXISTS proinvest;

USE proinvest;

CREATE TABLE RolUsuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) UNIQUE
);

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100),
    cedula VARCHAR(20) UNIQUE,
    correo_electronico VARCHAR(100) UNIQUE CHECK (correo_electronico LIKE '%@estudiantec.cr'),
    area_trabajo VARCHAR(50),
    cartera_digital DECIMAL(21, 6),
    telefono VARCHAR(15),
    contrasena VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol INT,
    estado BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (rol) REFERENCES RolUsuarios(id) ON DELETE SET NULL
);

CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(50) UNIQUE
);

CREATE TABLE TiposNotificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo_notificacion VARCHAR(50) UNIQUE
);

CREATE TABLE Proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    nombre_proyecto VARCHAR(100),
    descripcion TEXT,
    objetivo_financiacion DECIMAL(10, 2),
    monto_recaudado DECIMAL(10, 2) DEFAULT 0,
    fecha_limite DATE,
    categoria_id INT,
    imagenes_videos TEXT,  -- URL de los archivos multimedia
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id) ON DELETE SET NULL
);

CREATE TABLE Donaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_proyecto INT,
    monto_donado DECIMAL(10, 2),
    fecha_donacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_proyecto) REFERENCES Proyectos(id) ON DELETE CASCADE
);

CREATE TABLE Notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_tipo_notificacion INT,
    contenido TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    enviado BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo_notificacion) REFERENCES TiposNotificaciones(id) ON DELETE CASCADE
);
