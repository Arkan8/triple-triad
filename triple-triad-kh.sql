-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 13-04-2020 a las 10:58:49
-- Versión del servidor: 5.7.28
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `triple-triad-kh`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cards`
--

DROP TABLE IF EXISTS `cards`;
CREATE TABLE IF NOT EXISTS `cards` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `img_aliado` varchar(255) DEFAULT NULL,
  `img_rival` varchar(255) DEFAULT NULL,
  `valor_arriba` int(20) DEFAULT NULL,
  `valor_abajo` int(20) DEFAULT NULL,
  `valor_izquierda` int(20) DEFAULT NULL,
  `valor_derecha` int(20) DEFAULT NULL,
  `rareza` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cards`
--

INSERT INTO `cards` (`id`, `nombre`, `img_aliado`, `img_rival`, `valor_arriba`, `valor_abajo`, `valor_izquierda`, `valor_derecha`, `rareza`) VALUES
(1, 'aluvion', 'aluvion_azul.png', 'aluvion_rojo.png', 6, 1, 2, 1, '1'),
(2, 'claxon sanador', 'claxon_sanador_azul.png', 'claxon_sanador_rojo.png', 1, 4, 1, 5, '1'),
(3, 'desgarrador', 'desgarrador_azul.png', 'desgarrador_rojo.png', 2, 4, 4, 1, '1'),
(4, 'gancho_vampiro', 'gancho_vampiro_azul.png', 'gancho_vampiro_rojo.png', 3, 2, 1, 5, '1'),
(5, 'giraespinas', 'giraespinas_azul.png', 'giraespinas_rojo.png', 2, 2, 6, 1, '1'),
(6, 'grandullon', 'grandullon_azul.png', 'grandullon_rojo.png', 1, 3, 5, 3, '1'),
(7, 'minuto explosivo', 'minuto_explosivo_azul.png', 'minuto_explosivo_rojo.png', 2, 6, 1, 1, '1'),
(8, 'osado caballero', 'osado_caballero_azul.png', 'osado_caballero_rojo.png', 2, 1, 5, 3, '1'),
(9, 'perro rabioso', 'perro_rabioso_azul.png', 'perro_rabioso_rojo.png', 4, 4, 3, 2, '1'),
(10, 'soldado', 'soldado_azul.png', 'soldado_rojo.png', 5, 1, 3, 1, '1'),
(11, 'sombra', 'sombra_azul.png', 'sombra_rojo.png', 1, 1, 5, 4, '1'),
(12, 'asesino', 'asesino_azul.png', 'asesino_rojo.png', 5, 5, 2, 2, '2'),
(13, 'baularana', 'baularana_azul.png', 'baularana_rojo.png', 3, 5, 3, 4, '2'),
(14, 'boxeador aereo', 'boxeador_aereo_azul.png', 'boxeador_aereo_rojo.png', 5, 2, 5, 3, '2'),
(15, 'cargador magno', 'cargador_magno_azul.png', 'cargador_magno_rojo.png', 5, 3, 5, 1, '2'),
(16, 'ilusion fantasmal', 'ilusion_fantasmal_azul.png', 'ilusion_fantasmal_rojo.png', 5, 5, 3, 2, '2'),
(17, 'lancero', 'lancero_azul.png', 'lancero_rojo.png', 3, 1, 7, 2, '2'),
(18, 'martillo furioso', 'martillo_furioso_azul.png', 'martillo_furioso_rojo.png', 4, 5, 2, 4, '2'),
(19, 'neosombra', 'neosombra_azul.png', 'neosombra_rojo.png', 5, 3, 4, 3, '2'),
(20, 'pitonisa', 'pitonisa_azul.png', 'pitonisa_rojo.png', 6, 4, 3, 1, '2'),
(21, 'trepador', 'trepador_azul.png', 'trepador_rojo.png', 6, 2, 3, 2, '2'),
(22, 'umbrio', 'umbrio_azul.png', 'umbrio_rojo.png', 7, 3, 1, 1, '2'),
(23, 'armadura sombria', 'armadura_sombria_azul.png', 'armadura_sombria_rojo.png', 7, 5, 3, 1, '3'),
(24, 'bandido obeso', 'bandido_obeso_azul.png', 'bandido_obeso_rojo.png', 5, 2, 4, 6, '3'),
(25, 'chaman', 'chaman_azul.png', 'chaman_rojo.png', 6, 6, 3, 2, '3'),
(26, 'coche loco', 'coche_loco_azul.png', 'coche_loco_rojo.png', 4, 7, 2, 4, '3'),
(27, 'francotirador', 'francotirador_azul.png', 'francotirador_rojo.png', 7, 3, 5, 2, '3'),
(28, 'gargola guerrera', 'gargola_guerrera_azul.png', 'gargola_guerrera_rojo.png', 3, 5, 5, 5, '3'),
(29, 'gargola petrea', 'gargola_petrea_azul.png', 'gargola_petrea_rojo.png', 6, 1, 6, 3, '3'),
(30, 'mandragora', 'mandragora_azul.png', 'mandragora_rojo.png', 5, 3, 3, 6, '3'),
(31, 'robot centinela', 'robot_centinela_azul.png', 'robot_centinela_rojo.png', 7, 1, 3, 5, '3'),
(32, 'tahur', 'tahur_azul.png', 'tahur_rojo.png', 3, 4, 4, 6, '3'),
(33, 'tornado golpeador', 'tornado_golpeador_azul.png', 'tornado_golpeador_rojo.png', 6, 3, 2, 6, '3'),
(34, 'bombardero laser', 'bombardero_laser_azul.png', 'bombardero_laser_rojo.png', 2, 6, 7, 3, '4'),
(35, 'bravucon acorazado', 'bravucon_acorazado_azul.png', 'bravucon_acorazado_rojo.png', 2, 6, 3, 7, '4'),
(36, 'bravucon silvestre', 'bravucon_silvestre_azul.png', 'bravucon_silvestre_rojo.png', 4, 2, 7, 6, '4'),
(37, 'centauro fatal', 'centauro_fatal_azul.png', 'centauro_fatal_rojo.png', 6, 7, 3, 2, '4'),
(38, 'cubabum', 'cubabum_azul.png', 'cubabum_rojo.png', 6, 4, 5, 5, '4'),
(39, 'dragon', 'dragon_azul.png', 'dragon_rojo.png', 7, 4, 3, 5, '4'),
(40, 'huesos vivientes', 'huesos_vivientes_azul.png', 'huesos_vivientes_rojo.png', 3, 3, 6, 7, '4'),
(41, 'samurai', 'samurai_azul.png', 'samurai_rojo.png', 4, 5, 6, 5, '4'),
(42, 'sepulturero', 'sepulturero_azul.png', 'sepulturero_rojo.png', 7, 4, 4, 4, '4'),
(43, 'soldado de plomo', 'soldado_de_plomo_azul.png', 'soldado_de_plomo_rojo.png', 7, 1, 6, 3, '4'),
(44, 'torre de tension', 'torre_de_tension_azul.png', 'torre_de_tension_rojo.png', 1, 4, 7, 6, '4'),
(45, 'bailarina', 'bailarina_azul.png', 'bailarina_rojo.png', 7, 7, 4, 2, '5'),
(46, 'bibliotecario', 'bibliotecario_azul.png', 'bibliotecario_rojo.png', 6, 6, 5, 5, '5'),
(47, 'blues esmeralda', 'blues_esmeralda_azul.png', 'blues_esmeralda_rojo.png', 7, 5, 3, 6, '5'),
(48, 'devastador', 'devastador_azul.png', 'devastador_rojo.png', 7, 4, 2, 7, '5'),
(49, 'enloquecedor', 'enloquecedor_azul.png', 'enloquecedor_rojo.png', 5, 7, 6, 3, '5'),
(50, 'hechicero', 'hechicero_azul.png', 'hechicero_rojo.png', 4, 7, 4, 6, '5'),
(51, 'iluminador', 'iluminador_azul.png', 'iluminador_rojo.png', 6, 2, 7, 6, '5'),
(52, 'jazz carmesi', 'jazz_carmesi_azul.png', 'jazz_carmesi_rojo.png', 3, 2, 1, 10, '5'),
(53, 'orbemedusa', 'orbemedusa_azul.png', 'orbemedusa_rojo.png', 4, 7, 4, 5, '5'),
(54, 'roca plateada', 'roca_plateada_azul.png', 'roca_plateada_rojo.png', 3, 5, 7, 6, '5'),
(55, 'trabacronos', 'trabacronos_azul.png', 'trabacronos_rojo.png', 6, 6, 7, 2, '5'),
(56, 'arbolio loco', 'arbolio_loco_azul.png', 'arbolio_loco_rojo.png', 7, 3, 4, 8, '6'),
(57, 'carcelero', 'carcelero_azul.png', 'carcelero_rojo.png', 4, 5, 6, 8, '6'),
(58, 'carroza poseida', 'carroza_poseida_azul.png', 'carroza_poseida_rojo.png', 7, 8, 5, 2, '6'),
(59, 'espinas de sombra', 'espinas_de_sombra_azul.png', 'espinas_de_sombra_rojo.png', 2, 8, 4, 8, '6'),
(60, 'jefe gelido y jefe volcanico', 'jefe_gelido_y_jefe_volcanico_azul.png', 'jefe_gelido_y_jefe_volcanico_rojo.png', 6, 4, 5, 8, '6'),
(61, 'jinete de tormentas', 'jinete_de_tormentas_azul.png', 'jinete_de_tormentas_rojo.png', 7, 8, 1, 5, '6'),
(62, 'maestro de sinfonias', 'maestro_de_sinfonias_azul.png', 'maestro_de_sinfonias_rojo.png', 4, 7, 3, 8, '6'),
(63, 'metamorphosis', 'metamorphosis_azul.png', 'metamorphosis_rojo.png', 8, 8, 2, 2, '6'),
(64, 'parca pirata', 'parca_pirata_azul.png', 'parca_pirata_rojo.png', 1, 4, 8, 8, '6'),
(65, 'rueca fatal', 'rueca_fatal_azul.png', 'rueca_fatal_rojo.png', 1, 8, 3, 8, '6'),
(66, 'terremoto salvaje', 'terremoto_salvaje_azul.png', 'terremoto_salvaje_rojo.png', 6, 8, 4, 5, '6'),
(67, 'cerbero', 'cerbero_azul.png', 'cerbero_rojo.png', 8, 5, 4, 8, '7'),
(68, 'ferrocustodio iv', 'ferrocustodio_iv_azul.png', 'ferrocustodio_iv_rojo.png', 8, 7, 3, 6, '7'),
(69, 'hades', 'hades_azul.png', 'hades_rojo.png', 1, 7, 7, 8, '7'),
(70, 'hidra', 'hidra_azul.png', 'hidra_rojo.png', 5, 8, 5, 7, '7'),
(71, 'maestro imitador', 'maestro_imitador_azul.png', 'maestro_imitador_rojo.png', 5, 6, 8, 6, '7'),
(72, 'oogie boogie', 'oogie_boogie_azul.png', 'oogie_boogie_rojo.png', 8, 2, 8, 5, '7'),
(73, 'programa hostil', 'programa_hostil_azul.png', 'programa_hostil_rojo.png', 8, 5, 8, 3, '7'),
(74, 'scar', 'scar_azul.png', 'scar_rojo.png', 8, 4, 4, 8, '7'),
(75, 'shan yu', 'shan_yu_azul.png', 'shan_yu_rojo.png', 8, 4, 8, 4, '7'),
(76, 'triarmadura', 'triarmadura_azul.png', 'triarmadura_rojo.png', 7, 2, 8, 7, '7'),
(77, 'yafar', 'yafar_azul.png', 'yafar_rojo.png', 6, 4, 7, 8, '7'),
(78, 'cloud', 'cloud_azul.png', 'cloud_rojo.png', 3, 9, 6, 7, '8'),
(79, 'demyx', 'demyx_azul.png', 'demyx_rojo.png', 9, 4, 4, 8, '8'),
(80, 'larxene', 'larxene_azul.png', 'larxene_rojo.png', 6, 4, 9, 7, '8'),
(81, 'leon', 'leon_azul.png', 'leon_rojo.png', 9, 9, 2, 3, '8'),
(82, 'lexaeus', 'lexaeus_azul.png', 'lexaeus_rojo.png', 9, 2, 8, 6, '8'),
(83, 'luxord', 'luxord_azul.png', 'luxord_rojo.png', 8, 6, 2, 9, '8'),
(84, 'malefica', 'malefica_azul.png', 'malefica_rojo.png', 9, 7, 3, 6, '8'),
(85, 'pete', 'pete_azul.png', 'pete_rojo.png', 4, 8, 9, 4, '8'),
(86, 'sephiroth', 'sephiroth_azul.png', 'sephiroth_rojo.png', 9, 2, 9, 5, '8'),
(87, 'vexen', 'vexen_azul.png', 'vexen_rojo.png', 5, 9, 9, 1, '8'),
(88, 'zexion', 'zexion_azul.png', 'zexion_rojo.png', 4, 9, 2, 9, '8'),
(89, 'ansem', 'ansem_azul.png', 'ansem_rojo.png', 10, 2, 6, 8, '9'),
(90, 'axel', 'axel_azul.png', 'axel_rojo.png', 3, 10, 10, 1, '9'),
(91, 'donald', 'donald_azul.png', 'donald_rojo.png', 5, 8, 3, 10, '9'),
(92, 'goofy', 'goofy_azul.png', 'goofy_rojo.png', 8, 10, 4, 4, '9'),
(93, 'marluxia', 'marluxia_azul.png', 'marluxia_rojo.png', 8, 3, 5, 10, '9'),
(94, 'saix', 'saix_azul.png', 'saix_rojo.png', 7, 7, 10, 2, '9'),
(95, 'xaldin', 'xaldin_azul.png', 'xaldin_rojo.png', 7, 6, 10, 4, '9'),
(96, 'xemnas', 'xemnas_azul.png', 'xemnas_rojo.png', 4, 9, 10, 4, '9'),
(97, 'xigbar', 'xigbar_azul.png', 'xigbar_rojo.png', 10, 7, 7, 1, '9'),
(98, 'xion', 'xion_azul.png', 'xion_rojo.png', 7, 1, 7, 10, '9'),
(99, 'yen sid', 'yen_sid_azul.png', 'yen_sid_rojo.png', 9, 4, 2, 10, '9'),
(100, 'aqua', 'aqua_azul.png', 'aqua_rojo.png', 10, 3, 3, 10, '10'),
(101, 'eraqus', 'eraqus_azul.png', 'eraqus_rojo.png', 4, 2, 10, 10, '10'),
(102, 'kairi', 'kairi_azul.png', 'kairi_rojo.png', 5, 3, 9, 10, '10'),
(103, 'mickey', 'mickey_azul.png', 'mickey_rojo.png', 10, 2, 8, 7, '10'),
(104, 'namine', 'namine_azul.png', 'namine_rojo.png', 6, 6, 10, 7, '10'),
(105, 'riku', 'riku_azul.png', 'riku_rojo.png', 10, 6, 9, 4, '10'),
(106, 'roxas', 'roxas_azul.png', 'roxas_rojo.png', 10, 6, 4, 8, '10'),
(107, 'sora', 'sora_azul.png', 'sora_rojo.png', 2, 9, 10, 6, '10'),
(108, 'terra', 'terra_azul.png', 'terra_rojo.png', 6, 10, 4, 9, '10'),
(109, 'ventus', 'ventus_azul.png', 'ventus_rojo.png', 9, 10, 2, 6, '10'),
(110, 'xehanort', 'xehanort_azul.png', 'xehanort_rojo.png', 8, 10, 6, 5, '10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card_user`
--

DROP TABLE IF EXISTS `card_user`;
CREATE TABLE IF NOT EXISTS `card_user` (
  `user_id` int(255) NOT NULL,
  `card_id` int(255) NOT NULL,
  PRIMARY KEY (`user_id`,`card_id`),
  KEY `fk_cards` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `puntos` int(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `puntos`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, 'Mario', 'mario@gmail.com', '221b37fcdb52d0f7c39bbd0be211db0e1c00ca5fbecd5788780463026c6b964b', NULL, '2020-04-13 07:37:58', '2020-04-13 07:37:58', NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `card_user`
--
ALTER TABLE `card_user`
  ADD CONSTRAINT `fk_cards` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
