-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Temps de generació: 28-07-2022 a les 19:01:19
-- Versió del servidor: 10.4.24-MariaDB
-- Versió de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `solidartist`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `art_piece`
--

CREATE TABLE `art_piece` (
  `id` int(11) NOT NULL,
  `content` varchar(150) NOT NULL,
  `title` varchar(100) NOT NULL,
  `piece_type` varchar(50) NOT NULL,
  `front_page` varchar(150) DEFAULT NULL,
  `description` text NOT NULL,
  `sell_price` double NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `art_piece`
--

INSERT INTO `art_piece` (`id`, `content`, `title`, `piece_type`, `front_page`, `description`, `sell_price`, `creation_date`) VALUES
(1, 'art piece 1 of test', 'El mono liso', 'photo', '', 'This is el Mono Liso,a painitng that represents modernity an luxury on these times', 20, '2022-07-05 22:00:00'),
(2, 'Kaladin Stormblessed', 'Kaladin vs Szeth', 'Music', NULL, 'Soundtrack of the battle of Kaladin vs Szeth on the sky', 13.99, '2022-07-06 10:37:23'),
(3, '1657729542970-book.png', 'aadddaad', '', NULL, 'sdadadad', 34.5, '2022-07-13 16:25:43'),
(6, '1657730771532-crown.png', 'Corona', '', NULL, 'subida desde dashboard', 22.99, '2022-07-13 16:46:11'),
(7, '1657792333072-pexels-scott-webb-1022921.jpg', 'aadddaad', '', NULL, 'aaa', 46.99, '2022-07-14 09:52:13'),
(8, '1657811396479-free-music-128bpm-62830.mp3', 'rrtrtrt', 'audio', '1657811396483-mobile_png.png', 'trttrtrt', 43, '2022-07-14 15:09:56'),
(9, '1657812068910-pexels-soulful-pizza-3780681.jpg', 'Pizza', 'image', NULL, 'Pizza Pizza Pizzaaaaaaa', 10.45, '2022-07-14 15:21:08'),
(12, '1657813200655-kisspng-smartphone-feature-phone-iphone-mobile-phone-5a71a4008b04e6.0671463915173969925694.png', 'Prueba cat', 'image', NULL, 'Prueba catPrueba catPrueba cat', 0, '2022-07-14 15:40:00'),
(16, '1657813921352-pexels-caio-46274.jpg', '', 'image', NULL, '', 0, '2022-07-14 15:52:01'),
(17, '1657814114109-pexels-soulful-pizza-3780681 (1).jpg', 'a', 'image', NULL, 'a', 0, '2022-07-14 15:55:14'),
(18, '1657814879846-pexels-mareefe-932577.jpg', '', 'image', NULL, '', 0, '2022-07-14 16:07:59'),
(19, '1657819615692-free-music-128bpm-62830.mp3', 'asdasd', 'audio', '1657819615706-mobile_png.png', 'adasd', 45, '2022-07-14 17:26:55'),
(20, '1657821561917-mobile_png.png', '', 'image', NULL, '', 0, '2022-07-14 17:59:21'),
(21, '1657821616239-pexels-mareefe-932577.jpg', '', 'image', NULL, '', 0, '2022-07-14 18:00:16'),
(22, '1657821735115-pexels-caio-46274.jpg', '', 'image', NULL, '', 0, '2022-07-14 18:02:15'),
(23, '1657967712225-mobile_png.png', '', 'image', NULL, '', 0, '2022-07-16 10:35:12'),
(27, '1657968334238-pexels-pixabay-39866.jpg', 'dd', 'image', NULL, 'dd', 3, '2022-07-16 10:45:34');

-- --------------------------------------------------------

--
-- Estructura de la taula `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(60) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `categories`
--

INSERT INTO `categories` (`id`, `title`, `description`) VALUES
(1, 'Paintings', 'Paintings'),
(2, 'Music', 'Music');

-- --------------------------------------------------------

--
-- Estructura de la taula `categories_pieces`
--

CREATE TABLE `categories_pieces` (
  `id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_piece` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `categories_pieces`
--

INSERT INTO `categories_pieces` (`id`, `id_category`, `id_piece`) VALUES
(1, 1, 1),
(2, 2, 2),
(5, 1, 6),
(6, 1, 7),
(7, 2, 8),
(8, 1, 9),
(18, 1, 19),
(25, 1, 27);

-- --------------------------------------------------------

--
-- Estructura de la taula `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de la taula `collections_pieces`
--

CREATE TABLE `collections_pieces` (
  `id` int(11) NOT NULL,
  `id_collection` int(11) NOT NULL,
  `id_piece` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de la taula `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `id_user_reported` int(11) DEFAULT NULL,
  `id_user_reporting` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de la taula `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `profile_type` tinyint(1) NOT NULL,
  `role` int(11) NOT NULL,
  `user_img` varchar(150) DEFAULT NULL,
  `profile_img` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `alias`, `profile_type`, `role`, `user_img`, `profile_img`, `description`, `creation_date`) VALUES
(1, 'test', 'test', 'test', 0, 1, NULL, NULL, 'asdad', '2022-07-02 22:00:00'),
(7, 'hola', '$2b$10$NNWVwxzqkzWsjFkIgTduMeFQnUdpqm9Sr4QOEnbpnRII0OfxdsVHa', 'hola', 1, 2, NULL, NULL, NULL, '2022-07-04 14:53:50'),
(8, 'holaa', '$2b$10$LfZ5LYeMjt6IW3IkLyCUnOTvZNCEetYqvtFv8xQkMgGR72p/EVFRW', 'holaa', 0, 1, NULL, NULL, NULL, '2022-07-04 15:27:18'),
(11, 'asdasd', '$2b$10$aeVSW0vnVTJLbZU9fIcx.OuJ/zMuGyQRD9iTgzYEpkE3N6xJgFHOm', 'asdasd', 0, 1, '1657731757759-pexels-pixabay-39866.jpg', '1657571092247-mobile_png.png', 'Test deeedd', '2022-07-08 16:39:06');

-- --------------------------------------------------------

--
-- Estructura de la taula `users_pieces`
--

CREATE TABLE `users_pieces` (
  `id` int(11) NOT NULL,
  `id_creator` int(11) DEFAULT NULL,
  `id_current_owner` int(11) DEFAULT NULL,
  `id_piece` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `users_pieces`
--

INSERT INTO `users_pieces` (`id`, `id_creator`, `id_current_owner`, `id_piece`) VALUES
(1, 1, 1, 1),
(2, 1, 7, 2),
(5, 11, 11, 6),
(6, 11, 11, 7),
(7, 11, 11, 8),
(8, 11, 11, 9),
(11, 11, 11, 12),
(15, 11, 11, 16),
(16, 11, 11, 17),
(17, 11, 11, 18),
(18, 11, 11, 19),
(19, 11, 11, 20),
(20, 11, 11, 21),
(21, 11, 11, 22),
(25, 11, 11, 27);

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `art_piece`
--
ALTER TABLE `art_piece`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `categories_pieces`
--
ALTER TABLE `categories_pieces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_catgories_pieces_Id_Category` (`id_category`),
  ADD KEY `fk_categoies_pieces_Id_Piece` (`id_piece`);

--
-- Índexs per a la taula `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_user` (`id_user`);

--
-- Índexs per a la taula `collections_pieces`
--
ALTER TABLE `collections_pieces`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_reported` (`id_user_reported`),
  ADD KEY `fk_user_reporting` (`id_user_reporting`);

--
-- Índexs per a la taula `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Índexs per a la taula `users_pieces`
--
ALTER TABLE `users_pieces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_creator` (`id_creator`),
  ADD KEY `fk_id_current_owner` (`id_current_owner`),
  ADD KEY `fk_id_art_piece` (`id_piece`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `art_piece`
--
ALTER TABLE `art_piece`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT per la taula `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la taula `categories_pieces`
--
ALTER TABLE `categories_pieces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT per la taula `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `collections_pieces`
--
ALTER TABLE `collections_pieces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la taula `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT per la taula `users_pieces`
--
ALTER TABLE `users_pieces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restriccions per a les taules bolcades
--

--
-- Restriccions per a la taula `categories_pieces`
--
ALTER TABLE `categories_pieces`
  ADD CONSTRAINT `fk_categoies_pieces_Id_Piece` FOREIGN KEY (`id_piece`) REFERENCES `art_piece` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_catgories_pieces_Id_Category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restriccions per a la taula `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per a la taula `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `fk_user_reported` FOREIGN KEY (`id_user_reported`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_reporting` FOREIGN KEY (`id_user_reporting`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restriccions per a la taula `users_pieces`
--
ALTER TABLE `users_pieces`
  ADD CONSTRAINT `fk_id_art_piece` FOREIGN KEY (`id_piece`) REFERENCES `art_piece` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_creator` FOREIGN KEY (`id_creator`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_current_owner` FOREIGN KEY (`id_current_owner`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
