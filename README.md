# OCI Zero To Hero Chapter 6
Ejemplo desarrollado en Spring Boot + Angular para mostrar el uso de MySQL y Block Volume en OCI. Estos comandos están realizados para distribuciones Oracle Linux, CentOS y Red Hat.

## Prerrequisitos
Para que puedas crear el **jar** se deben realizar los siguientes pasos y se deben tener las siguientes herramientas instaladas en el computador.

- [Java](https://www.oracle.com/java/technologies/downloads/) - Para poder ejecutar el código **Java**, se recomienda utilizar Java 17!
- [Git](https://git-scm.com/) - Para descargar los repositorios!
- [NodeJS](https://nodejs.org/en/) - Para instalar el paquete **npm** y poder descargar las dependencias!
- [Visual Studio Code](https://code.visualstudio.com/) - Un editor de texto enriquecido!

## Instalacion de Angular CLI
Luego de instalar los prerrequisitos, procedemos con la instalación del Angular CLI para poder crear el build del proyecto frontend.

```sh
npm install -g @angular/cli
ng --version
```

## Script de Base de Datos

```sql
CREATE DATABASE `zth`;

USE `zth`;

DROP TABLE IF EXISTS `album_cancion`;
DROP TABLE IF EXISTS `cancion`;
DROP TABLE IF EXISTS `album`;
DROP TABLE IF EXISTS `genero`;
DROP TABLE IF EXISTS `artista`;

CREATE TABLE `genero` (
  `id` int AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  CONSTRAINT pk_genero PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=9 COMMENT='Maestro de Generos Musicales';

CREATE TABLE `artista` (
  `id` int AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `nombre_real` varchar(250),
  `pais` varchar(250),
  CONSTRAINT pk_artista PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 COMMENT='Maestro de Artistas Musicales';

CREATE TABLE `album` (
  `id` int AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `foto` varchar(150),
  `lanzamiento` varchar(4) NOT NULL,
  CONSTRAINT pk_album PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 COMMENT='Maestro de Albumes Musicales';

CREATE TABLE `cancion` (
  `id` int AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `genero_id` int NOT NULL,
  CONSTRAINT pk_cancion PRIMARY KEY (id),
  CONSTRAINT fk_cancion_001 FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 COMMENT='Maestro de Canciones';

CREATE TABLE `album_cancion` (
  `id` int AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `cancion_id` int NOT NULL,
  `artista_id` int NOT NULL,
  CONSTRAINT pk_album_cancion PRIMARY KEY (`id`),
  CONSTRAINT fk_album_cancion_001 FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  CONSTRAINT fk_album_cancion_002 FOREIGN KEY (`cancion_id`) REFERENCES `cancion` (`id`),
  CONSTRAINT fk_album_cancion_003 FOREIGN KEY (`artista_id`) REFERENCES `artista` (`id`),
  CONSTRAINT uk_album_cancion_001 UNIQUE (`album_id`,`cancion_id`,`artista_id`)
) ENGINE=InnoDB COMMENT='Detalle de canciones en un Album';

INSERT INTO `genero` (`id`, `nombre`)
     VALUES (1, 'Tropical'),
            (2, 'Vallenato'),
            (3, 'Salsa');

INSERT INTO `artista` (`id`, `nombre`, `nombre_real`, `pais`)
     VALUES (1, 'Carlos Vives', 'Carlos Alberto Vives Restrepo', 'Colombia'),
            (2, 'Gilberto Santa Rosa', 'Gilberto Santa Rosa Cortes', 'Puerto Rico');

INSERT INTO `album` (`id`, `nombre`, `foto`, `lanzamiento`)
     VALUES (1, 'La Tierra del Olvido', NULL, '1995'),
            (2, 'Esencia', NULL, '1996');

INSERT INTO `cancion` (`id`, `nombre`, `genero_id`)
     VALUES (1, 'Pa\' Mayte', 2),
            (2, 'Fidelina', 2),
            (3, 'La Tierra del Olvido', 2),
            (4, 'Zoila', 2),
            (5, 'Rosa', 2),
            (6, 'Agua', 2),
            (7, 'La Cachucha Bacana', 2),
            (8, 'Diosa Coronada', 2),
            (9, 'La Puya Puya', 2),
            (10, 'Ella', 2),
            (11, 'Jam en Jukumey', 2),
            (12, 'No Quiero Na\' Regala\'o', 3),
            (13, 'Amandote', 3),
            (14, 'Esas Lagrimas', 3),
            (15, 'Yo No Te Pido', 3),
            (16, 'Me Falto', 3),
            (17, '...Y Eso Duele', 3),
            (18, 'Para Vivir', 3),
            (19, 'Siempre Acabo Igual', 3),
            (20, 'No Ha Pasado Nada', 3),
            (21, 'Peligro', 3),
            (22, 'Dolia Menos', 3),
            (23, 'Yo No Queria Conocerte', 3);

INSERT INTO `album_cancion` (`album_id`, `cancion_id`, `artista_id`)
     VALUES (1, 1, 1), (1, 2, 1), (1, 3, 1), (1, 4, 1),
            (1, 5, 1), (1, 6, 1), (1, 7, 1), (1, 8, 1),
            (1, 9, 1), (1, 10, 1), (1, 11, 1), (2, 12, 2),
            (2, 13, 2), (2, 14, 2), (2, 15, 2), (2, 16, 2),
            (2, 17, 2), (2, 18, 2), (2, 19, 2), (2, 20, 2),
            (2, 21, 2), (2, 22, 2), (2, 23, 2);
```

En el archivo **backend/src/main/resources/application.properties**, se debe modificar la cadena de conexión de acuerdo con la base de datos que se haya desplegado.

## Instalacion en Maquina Virtual
Para realizar estos pasos debemos desplegar una Máquina Virtual en OCI con 1 OCPU y 8 Gb de RAM, utilizando la imagen de Oracle Linux 8.

```sh
sudo dnf install java
sudo firewall-cmd --list-ports
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
wget https://github.com/ociknowledge/ociz2h06/releases/download/v1.0.0/z2h.jar
```

Los siguientes pasos los debemos ejecutar como root.

```sh
sudo -su root
sudo cat <<EOF > /etc/systemd/system/z2h.service
[Unit]
Description=Spring Boot WebApp for From Zero To Hero

[Service]
Type=simple
Restart=on-failure
User=opc
ExecStart=/usr/java/default/bin/java -jar /home/opc/z2h.jar

[Install] 
WantedBy=multi-user.target
EOF
```

Por último, sobre el usuario por defecto realizamos los siguientes comandos.

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now z2h
sudo systemctl status z2h
```