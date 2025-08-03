-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2025 at 06:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dms2`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `mobile` varchar(56) DEFAULT NULL,
  `phone` varchar(56) DEFAULT NULL,
  `address` varchar(512) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `mobile`, `phone`, `address`, `url`, `email`, `created_at`, `updated_at`) VALUES
(1, 'Nokia', NULL, NULL, NULL, NULL, NULL, '2023-11-06 04:59:49', '2023-11-06 04:59:49');

-- --------------------------------------------------------

--
-- Table structure for table `cats`
--

CREATE TABLE `cats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `cats`
--

INSERT INTO `cats` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Smart Phone', '2019-05-15 09:19:46', '2019-05-15 09:19:46'),
(5, 'Headphone', '2019-05-15 09:19:46', '2019-05-15 09:19:46'),
(7, 'Speaker', '2019-05-15 09:19:46', '2019-05-15 09:19:46'),
(10, 'In Ear corded headset', '2019-06-09 11:04:08', '2020-09-03 06:18:06'),
(11, 'Over the ear Headset', '2019-06-09 11:04:40', '2020-09-03 06:17:45'),
(12, 'Wireless portable speaker', '2019-09-25 06:23:35', '2020-09-03 06:17:23'),
(13, 'Wireless Headphone', '2019-10-17 05:03:32', '2020-09-03 06:16:55'),
(14, 'Earbuds', '2019-11-06 14:22:02', '2020-09-03 06:16:30'),
(15, 'Smart Watch', '2020-05-30 09:37:23', '2020-09-03 06:18:31'),
(16, 'Powerbank', '2020-12-01 12:49:36', '2020-12-01 12:49:36'),
(17, 'Router', '2020-12-02 06:23:49', '2020-12-02 06:23:49'),
(18, 'Smart Band', '2020-12-02 06:24:43', '2020-12-02 06:24:43'),
(22, 'HDMI Adapter', '2020-12-07 05:34:19', '2020-12-07 05:34:19'),
(23, 'HDMI Cable', '2020-12-07 05:34:35', '2020-12-07 05:34:35'),
(24, 'Tablet', '2021-06-28 05:41:14', '2021-06-28 05:41:14'),
(25, 'Data Cable', '2022-02-08 09:35:03', '2022-02-08 09:35:03'),
(26, 'In-Ear Headphone', '2022-02-08 09:48:12', '2022-02-08 09:48:12'),
(27, 'Feature Phone', '2022-07-23 07:10:30', '2022-07-23 07:10:30'),
(28, 'Trimmer', '2022-11-12 12:02:14', '2022-11-12 12:02:14'),
(29, 'Open Ear Neckband', '2022-12-14 04:02:25', '2022-12-14 04:02:25'),
(31, 'Wireless Pocket Router', '2023-01-12 06:47:08', '2023-01-12 06:47:08'),
(32, 'Power Adapter', '2023-03-29 09:09:56', '2023-03-29 09:09:56');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_06_30_045516_create_permission_tables', 2);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 7),
(2, 'App\\Models\\User', 10),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 6),
(3, 'App\\Models\\User', 11),
(4, 'App\\Models\\User', 5),
(5, 'App\\Models\\User', 4);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `quantity` int(10) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 2, '2181', '2025-07-23 03:40:18', '2025-07-23 03:40:18'),
(2, 1, 16, 1, '8269', '2025-07-23 03:40:18', '2025-07-23 03:40:18'),
(3, 2, 2, 1, '2181', '2025-07-23 04:00:10', '2025-07-23 04:00:10'),
(4, 3, 4, 1, '2181', '2025-07-24 01:03:04', '2025-07-24 01:03:04'),
(5, 4, 4, 1, '2181', '2025-07-30 03:33:42', '2025-07-30 03:33:42');

-- --------------------------------------------------------

--
-- Table structure for table `orderimeis`
--

CREATE TABLE `orderimeis` (
  `id` int(11) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `stock_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderimeis`
--

INSERT INTO `orderimeis` (`id`, `order_id`, `stock_id`, `created_at`, `updated_at`) VALUES
(3, 2, 1, '2025-07-23 06:29:12', '2025-07-23 06:29:12');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `order_by` bigint(20) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_by`, `remarks`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'This is a test order', 2, '2025-07-23 03:40:18', '2025-07-23 08:20:29'),
(2, 1, 1, 'A test order by Kamran', 5, '2025-07-23 04:00:10', '2025-07-23 08:49:12'),
(3, 1, 1, 'Test Order', 1, '2025-07-24 01:03:04', '2025-07-24 02:14:59'),
(4, 1, 1, NULL, 0, '2025-07-30 03:33:42', '2025-07-30 03:33:42');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(5, 'stock_out', 'web', '2025-07-24 02:27:37', '2025-07-24 02:27:37'),
(6, 'view_stocks', 'web', '2025-07-24 03:20:18', '2025-07-24 03:22:04'),
(7, 'view_orders', 'web', '2025-07-24 03:31:14', '2025-07-24 03:31:14'),
(8, 'view_orders_acc', 'web', '2025-07-24 03:31:27', '2025-07-24 03:31:27'),
(9, 'system_settings', 'web', '2025-07-24 03:35:55', '2025-07-24 03:35:55'),
(10, 'user_configuration', 'web', '2025-07-24 03:36:27', '2025-07-24 03:36:27'),
(11, 'receive_products', 'web', '2025-07-24 03:38:24', '2025-07-24 03:38:24'),
(12, 'sale_product', 'web', '2025-07-24 03:39:35', '2025-07-24 03:39:35'),
(13, 'retailer_stocks', 'web', '2025-07-24 04:25:20', '2025-07-24 04:25:20'),
(14, 'system_configuration', 'web', '2025-07-24 04:48:16', '2025-07-24 04:48:16'),
(17, 'bulk_upload_admin', 'web', '2025-07-27 02:05:31', '2025-07-27 02:05:31'),
(18, 'warranty_activation', 'web', '2025-07-27 03:53:02', '2025-07-27 03:53:02'),
(19, 'dashboard_user_data', 'web', '2025-07-29 01:28:21', '2025-07-29 02:00:09'),
(20, 'dashboard_brand_data', 'web', '2025-07-29 02:00:39', '2025-07-29 02:00:39'),
(21, 'dashboard_category_data', 'web', '2025-07-29 02:00:49', '2025-07-29 02:00:49'),
(22, 'dashboard_product_data', 'web', '2025-07-29 02:01:00', '2025-07-29 02:01:00'),
(23, 'dashboard_order_data', 'web', '2025-07-29 02:01:11', '2025-07-29 02:01:11'),
(24, 'dashboard_primary_sales', 'web', '2025-07-29 02:01:19', '2025-07-29 02:01:19'),
(25, 'dashboard_secondary_sales', 'web', '2025-07-29 02:01:26', '2025-07-29 02:01:26'),
(26, 'dashboard_tertiary_sales', 'web', '2025-07-29 02:01:33', '2025-07-29 02:01:33'),
(27, 'dashboard_total_stock', 'web', '2025-07-29 02:24:29', '2025-07-29 02:24:29'),
(28, 'dashboard_available_stock', 'web', '2025-07-29 02:24:51', '2025-07-29 02:24:51'),
(29, 'dashboard_dealer_stock', 'web', '2025-07-29 02:25:26', '2025-07-29 02:25:26'),
(30, 'dashboard_retailer_stock', 'web', '2025-07-29 02:25:36', '2025-07-29 02:25:36'),
(31, 'dashboard_dealer_purchase', 'web', '2025-07-29 02:35:55', '2025-07-29 02:35:55'),
(32, 'dashboard_retailer_purchase', 'web', '2025-07-29 02:36:02', '2025-07-29 02:36:02'),
(33, 'dashboard_sales_overview', 'web', '2025-07-29 02:58:32', '2025-07-29 02:58:32'),
(34, 'dashboard_distribution_ratio', 'web', '2025-07-29 02:58:41', '2025-07-29 02:58:41'),
(35, 'dealer_return_product', 'web', '2025-07-30 00:49:11', '2025-07-30 00:49:11'),
(36, 'admin_return_product', 'web', '2025-07-30 00:54:44', '2025-07-30 00:54:44'),
(37, 'retailer_return_product', 'web', '2025-07-30 01:37:26', '2025-07-30 01:37:26'),
(38, 'dashboard_total_return', 'web', '2025-07-30 03:57:06', '2025-07-30 03:57:06'),
(39, 'admin_reports', 'web', '2025-07-30 05:29:05', '2025-07-30 05:29:05');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prisales`
--

CREATE TABLE `prisales` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `stock_id` bigint(20) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `prisales`
--

INSERT INTO `prisales` (`id`, `user_id`, `order_id`, `stock_id`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, 2, 1, 1, '2025-07-23 08:51:03', '2025-07-23 23:08:41'),
(9, 3, NULL, 8, 1, '2025-07-27 01:30:52', '2025-07-29 04:05:54'),
(11, 3, NULL, 11, 1, '2025-07-27 01:30:52', '2025-07-29 04:05:54');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cat_id` bigint(20) NOT NULL,
  `brand_id` bigint(20) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `model` varchar(128) DEFAULT NULL,
  `product_code` varchar(100) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `dp` int(100) NOT NULL DEFAULT 1,
  `rp` int(100) NOT NULL DEFAULT 0,
  `mrp` int(100) NOT NULL DEFAULT 0,
  `details` text DEFAULT NULL,
  `photo` varchar(256) DEFAULT NULL,
  `chalan_type` int(100) DEFAULT NULL,
  `dwstatus` tinyint(4) DEFAULT 0,
  `dwcharge` int(11) NOT NULL DEFAULT 0,
  `dwday` int(11) NOT NULL DEFAULT 0,
  `dwduration` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `cat_id`, `brand_id`, `name`, `model`, `product_code`, `color`, `dp`, `rp`, `mrp`, `details`, `photo`, `chalan_type`, `dwstatus`, `dwcharge`, `dwday`, `dwduration`, `created_at`, `updated_at`) VALUES
(2, 27, 1, 'NOKIA 105 TA-1570 DS', 'NOKIA 105 TA-1570 DS_Charcoal', 'N1001', 'Charcoal', 2181, 0, 0, 'Featurephone', '1699942246146057386.png', 1, 0, 0, 0, 0, '2023-11-14 06:10:46', '2025-07-26 22:09:09'),
(3, 27, 1, 'NOKIA 105 TA-1570 DS', 'NOKIA 105 TA-1570 DS_Cyan', 'N1002', 'Cyan', 2181, 0, 0, 'Featurephone', '16999424141038641031.jpg', 1, 0, 0, 0, 0, '2023-11-14 06:13:34', '2024-01-11 04:43:32'),
(4, 27, 1, 'NOKIA 105 TA-1570 DS', 'NOKIA 105 TA-1570 DS_Terracotta Red', 'N1003', 'Terracotta Red', 2181, 0, 0, 'Featurephone', '16999424731699151596.jpg', 1, 0, 0, 0, 0, '2023-11-14 06:14:33', '2024-01-11 04:43:07'),
(5, 27, 1, 'NOKIA 106 TA-1572 DS', 'NOKIA 106 TA-1572 DS_Charcoal', 'N1004', 'Charcoal', 2292, 0, 0, 'FP', '169994253866877510.jpg', 1, 0, 0, 0, 0, '2023-11-14 06:15:38', '2024-01-11 04:46:22'),
(6, 27, 1, 'NOKIA 106 TA-1572 DS', 'NOKIA 106 TA-1572 DS_Emerald Green', 'N1005', 'Emerald Green', 2292, 0, 0, 'FP', '16999426291188843535.jpg', 1, 0, 0, 0, 0, '2023-11-14 06:17:09', '2024-01-11 04:45:47'),
(7, 27, 1, 'NOKIA 106 TA-1572 DS', 'NOKIA 106 TA-1572 DS_Terracotta Red', 'N1006', 'Terracotta Red', 2292, 0, 0, 'FP', '16999426861961617970.jpg', 1, 0, 0, 0, 0, '2023-11-14 06:18:06', '2024-01-11 04:45:11'),
(8, 27, 1, 'NOKIA 110 TA-1565 DS', 'NOKIA 110 TA-1565 DS_Charcoal', 'N1007', 'Charcoal', 2781, 0, 0, 'FP', '1699942801270431091.jpg', 1, 0, 0, 0, 0, '2023-11-14 06:20:01', '2024-01-11 04:47:39'),
(9, 27, 1, 'NOKIA 110 TA-1565 DS', 'NOKIA 110 TA-1565 DS_Cloudy Blue', 'N1008', 'Cloudy Blue', 2781, 0, 0, 'FP', '1699942857169762250.jpg', 1, 0, 0, 0, 0, '2023-11-14 06:20:57', '2024-01-11 04:47:10'),
(10, 27, 1, 'NOKIA 150 TA-1582 DS', 'NOKIA 150 TA-1582 DS_Black', 'N1009', 'Black', 3853, 0, 0, 'FP', '1699942908371017392.jpeg', 1, 0, 0, 0, 0, '2023-11-14 06:21:48', '2024-01-11 04:49:38'),
(11, 27, 1, 'NOKIA 150 TA-1582 DS', 'NOKIA 150 TA-1582 DS_Blue', 'N1010', 'Blue', 3853, 0, 0, 'FP', '1699942960877813635.png', 1, 0, 0, 0, 0, '2023-11-14 06:22:40', '2024-01-11 04:48:58'),
(12, 1, 1, 'NOKIA C32 TA-1548 DS', 'NOKIA C32 TA-1548 DS_Charcoal', 'N1011', 'Charcoal', 12394, 0, 0, 'SP', '1699943047153646347.jpeg', NULL, 0, 0, 0, 0, '2023-11-14 06:24:07', '2024-01-30 08:42:56'),
(13, 1, 1, 'NOKIA C32 TA-1548 DS', 'NOKIA C32 TA-1548 DS_Autumn Green', 'N1012', 'Autumn Green', 12394, 0, 0, 'SP', '1699943126291153164.png', NULL, 0, 0, 0, 0, '2023-11-14 06:25:26', '2024-01-30 08:42:33'),
(14, 1, 1, 'NOKIA C22 TA-1539 DS', 'NOKIA C22 TA-1539 DS_Charcoal', 'N1013', 'Charcoal', 9212, 0, 0, 'SP', '16999432131990095473.png', NULL, 0, 0, 0, 0, '2023-11-14 06:26:53', '2024-01-30 08:41:58'),
(15, 1, 1, 'NOKIA C22 TA-1539 DS', 'NOKIA C22 TA-1539 DS_Sand', 'N1014', 'Sand', 9212, 0, 0, 'SP', '16999432791237172309.jpg', NULL, 0, 0, 0, 0, '2023-11-14 06:27:59', '2024-01-30 08:41:35'),
(16, 1, 1, 'NOKIA C12 PRO TA-1562 DS', 'NOKIA C12 PRO TA-1562 DS_Charcoal', 'N1015', 'Charcoal', 8269, 0, 0, 'SP', '1699943351450741070.jpeg', NULL, 0, 0, 0, 0, '2023-11-14 06:29:11', '2024-01-30 08:41:02'),
(17, 1, 1, 'NOKIA C12 PRO TA-1562 DS', 'NOKIA C12 PRO TA-1562 DS_Dark Cyan', 'N1016', 'Dark Cyan', 8269, 0, 0, 'SP', '16999434401759629227.jpg', NULL, 0, 0, 0, 0, '2023-11-14 06:30:40', '2024-01-30 08:40:45'),
(18, 1, 1, 'NOKIA C12 PRO TA-1562 DS', 'NOKIA C12 PRO TA-1562 DS_Light Mint', 'N1017', 'Light Mint', 8269, 0, 0, 'SP', '16999434951894563633.jpg', NULL, 0, 0, 0, 0, '2023-11-14 06:31:35', '2024-01-30 08:39:47'),
(19, 27, 1, 'NOKIA 150 TA-1582 DS', 'NOKIA 150 TA-1582 DS_Red', 'N1018', 'Red', 3853, 0, 0, 'FP', NULL, 1, 0, 0, 0, 0, '2024-01-02 12:51:53', '2024-01-11 04:48:25');

-- --------------------------------------------------------

--
-- Table structure for table `retailers`
--

CREATE TABLE `retailers` (
  `id` int(11) NOT NULL,
  `dealer_id` bigint(20) DEFAULT NULL,
  `retailer_id` bigint(20) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `retailers`
--

INSERT INTO `retailers` (`id`, `dealer_id`, `retailer_id`, `status`, `created_at`, `updated_at`) VALUES
(2, 3, 2, 1, '2025-07-23 23:48:19', '2025-07-23 23:48:19'),
(5, 6, 7, 1, '2025-07-29 04:16:51', '2025-07-29 04:16:51');

-- --------------------------------------------------------

--
-- Table structure for table `returns`
--

CREATE TABLE `returns` (
  `id` int(11) NOT NULL,
  `dealer_id` bigint(20) DEFAULT NULL,
  `retailer_id` bigint(20) DEFAULT NULL,
  `stock_id` bigint(20) DEFAULT NULL,
  `type` int(1) DEFAULT NULL COMMENT '1-ByDealer\r\n2- ByRetailer',
  `status` int(1) NOT NULL DEFAULT 0,
  `approve_by` bigint(20) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `returns`
--

INSERT INTO `returns` (`id`, `dealer_id`, `retailer_id`, `stock_id`, `type`, `status`, `approve_by`, `remarks`, `created_at`, `updated_at`) VALUES
(3, 3, NULL, 9, 1, 2, NULL, 'This is a dealer1 return', '2025-07-30 00:32:56', '2025-07-30 01:27:58'),
(5, 3, NULL, 11, 1, 5, NULL, 'Another test return from dealer1', '2025-07-30 01:30:48', '2025-07-30 01:32:14'),
(6, 3, 2, 8, 1, 1, NULL, 'This is a test return from retailer1', '2025-07-30 02:10:37', '2025-07-30 02:18:38');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'web', '2025-06-29 23:10:42', '2025-06-29 23:10:42'),
(2, 'Retailer', 'web', '2025-07-23 23:16:41', '2025-07-23 23:16:41'),
(3, 'Dealer', 'web', '2025-07-23 23:18:26', '2025-07-23 23:18:26'),
(4, 'warehouse', 'web', '2025-07-24 03:19:23', '2025-07-24 03:19:23'),
(5, 'Accounts', 'web', '2025-07-24 03:30:38', '2025-07-24 03:30:38');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(5, 4),
(6, 1),
(6, 4),
(7, 3),
(8, 5),
(9, 1),
(10, 1),
(11, 3),
(12, 3),
(13, 2),
(14, 1),
(17, 1),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(18, 5),
(19, 1),
(19, 4),
(19, 5),
(20, 1),
(20, 3),
(20, 4),
(20, 5),
(21, 1),
(21, 3),
(21, 4),
(21, 5),
(22, 1),
(22, 3),
(22, 4),
(22, 5),
(23, 1),
(23, 3),
(23, 4),
(23, 5),
(24, 1),
(24, 4),
(24, 5),
(25, 1),
(25, 3),
(25, 4),
(25, 5),
(26, 1),
(26, 2),
(26, 3),
(26, 4),
(26, 5),
(27, 1),
(27, 4),
(27, 5),
(28, 1),
(28, 4),
(28, 5),
(29, 3),
(30, 2),
(31, 3),
(32, 2),
(33, 1),
(33, 4),
(33, 5),
(34, 1),
(34, 4),
(34, 5),
(35, 3),
(36, 1),
(37, 2),
(38, 1),
(38, 4),
(38, 5),
(39, 1);

-- --------------------------------------------------------

--
-- Table structure for table `secsales`
--

CREATE TABLE `secsales` (
  `id` int(11) NOT NULL,
  `dealer_id` bigint(20) DEFAULT NULL COMMENT 'users.id',
  `retailer_id` bigint(20) DEFAULT NULL COMMENT 'users.id',
  `stock_id` bigint(20) DEFAULT NULL COMMENT 'stocks.id',
  `status` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `secsales`
--

INSERT INTO `secsales` (`id`, `dealer_id`, `retailer_id`, `stock_id`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, 2, 1, 0, '2025-07-24 00:50:00', '2025-07-24 00:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `header_color` varchar(255) DEFAULT NULL,
  `sidebar_color` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `logo`, `header_color`, `sidebar_color`, `created_at`, `updated_at`) VALUES
(1, '4fc4ddfe-6206-461f-9799-de5abb49c9c2.png', '#e7e6ef', '#051445', '2025-06-30 00:21:19', '2025-07-29 03:20:42');

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `imei1` varchar(255) DEFAULT NULL,
  `imei2` varchar(255) DEFAULT NULL,
  `warranty` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '0-In Stock,\r\n1- Primary\r\n2- Secondary\r\n3- Tertiary',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `product_id`, `imei1`, `imei2`, `warranty`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, '123456', '123456', '365', 3, '2025-07-23 04:57:29', '2025-07-27 04:28:05'),
(8, 2, '123457', '123457', '365', 1, '2025-07-27 01:18:32', '2025-07-30 02:18:38'),
(9, 3, '123458', '123458', '180', 0, '2025-07-27 01:18:32', '2025-07-30 01:27:58'),
(10, 9, '123459', '123459', '365', 3, '2025-07-27 02:21:51', '2025-07-29 03:52:52'),
(11, 2, '123451', '123451', '365', 1, '2025-07-29 05:17:15', '2025-07-29 05:17:15');

-- --------------------------------------------------------

--
-- Table structure for table `tersales`
--

CREATE TABLE `tersales` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `stock_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT 'Customer',
  `phone` varchar(20) DEFAULT NULL COMMENT 'Customer',
  `address` varchar(255) DEFAULT NULL COMMENT 'Customer',
  `remarks` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tersales`
--

INSERT INTO `tersales` (`id`, `user_id`, `stock_id`, `name`, `phone`, `address`, `remarks`, `created_at`, `updated_at`) VALUES
(13, 2, 1, 'Md Kamran Hosan', '01609758377', 'Dhaka\nDhaka', NULL, '2025-07-27 04:28:05', '2025-07-27 04:28:05'),
(15, 1, 10, 'Nuruzzaman', '1609758368', 'jinaidah', '', '2025-07-29 03:52:52', '2025-07-29 03:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `office_id` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `photo`, `office_id`, `phone`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Kamran Hosan', 'kamran@gmail.com', '8p3G3Xv93jRFAFMKDmb3mjQQOKDJQp6O4mGhkiKB.jpg', 'ADMIN', '01609758377', NULL, '$2y$10$UeRIfn94UC8s/.RtzNAGrO7/CyCkei3FRhv6MePSjL/iInx2/VNNm', 'fh2qwybRgkYzOUyuW7o3cgDiyoUHkP0lVlTV2NioJVd5owrdKCQcA4c6IfeT', '2025-06-29 00:02:54', '2025-07-27 01:40:53'),
(2, 'Retailer1', 'retailer1@gmail.com', NULL, 'RT01', NULL, NULL, '$2y$10$kVdVVRmYvO9QIR.7T6S05uJBzm/QDG3rFLMk2oCygJsx/JldUVZbC', NULL, '2025-07-23 23:17:30', '2025-07-23 23:17:30'),
(3, 'Dealer1', 'dealer1@gmail.com', NULL, 'LD01', NULL, NULL, '$2y$10$MU79zuF8TswwHxgR4fd.JuNGCKJoCNmGokQ3c8RrBD6G0fPy.IDUO', NULL, '2025-07-23 23:19:13', '2025-07-23 23:19:13'),
(4, 'Accounts', 'accounts@gmail.com', NULL, 'ACC01', NULL, NULL, '$2y$10$Od4yOIm1Y3Epz9Re1AW56OCXqFaavaaZsReuO5nTRZRhuwe2O0I6q', NULL, '2025-07-24 03:33:56', '2025-07-24 03:33:56'),
(5, 'Warehouse', 'warehouse@gmail.com', NULL, 'WH01', NULL, NULL, '$2y$10$cfNOcWhbg7pS98uCG7IbTOJ33D1umMJOU8rz846M2q5103kWvGNOW', NULL, '2025-07-24 03:34:25', '2025-07-24 03:34:25'),
(6, 'Dealer2', 'dealer2@gmail.com', NULL, 'LD02', '01609758366', NULL, '$2y$10$Hg1w5yPoTUOWtvQC3HigvuuBF2xglQTeDIr39DCfJndoO./X3YJJy', NULL, '2025-07-29 01:10:13', '2025-07-29 01:10:28'),
(7, 'Retailer 2', 'retailer2@gmaul.com', NULL, 'RT02', '01609875463', NULL, '$2y$10$.8.bB0X4pfJ4d47Nxmb5.ucUDaqRJhPmGPHzm78qs8fP0KO4I.3h.', NULL, '2025-07-29 04:16:18', '2025-07-29 04:16:30'),
(10, 'Retailer 3', 'retailer3@gmail.com', NULL, 'RT03', '1609758323', NULL, '$2y$10$riRd9zjOE9eNrbjQXa8SSes3MjofIf5fEnm4gPCbrPIUJEm8AXplq', NULL, '2025-07-29 04:42:39', '2025-07-29 04:42:39'),
(11, 'Dealer 3', 'dealer3@gmail.com', NULL, 'LD03', '1609758399', NULL, '$2y$10$8x8F44NxoVBttnNWJPVIT.ZE1qQCQyJEN2ZJvmT5IMqlznveSvlEK', NULL, '2025-07-29 04:45:32', '2025-07-29 04:45:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cats`
--
ALTER TABLE `cats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderimeis`
--
ALTER TABLE `orderimeis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `prisales`
--
ALTER TABLE `prisales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `model` (`model`),
  ADD KEY `cat_id` (`cat_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `retailers`
--
ALTER TABLE `retailers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `returns`
--
ALTER TABLE `returns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `secsales`
--
ALTER TABLE `secsales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tersales`
--
ALTER TABLE `tersales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cats`
--
ALTER TABLE `cats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orderimeis`
--
ALTER TABLE `orderimeis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prisales`
--
ALTER TABLE `prisales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `retailers`
--
ALTER TABLE `retailers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `returns`
--
ALTER TABLE `returns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `secsales`
--
ALTER TABLE `secsales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tersales`
--
ALTER TABLE `tersales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
