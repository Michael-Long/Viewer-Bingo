--
-- Table structure for table `entries`
--

CREATE TABLE `entries` (
  `id` int(11) NOT NULL,
  `content` mediumtext NOT NULL,
  `isRandomized` tinyint(1) NOT NULL DEFAULT 0,
  `isChecked` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `entries`
--

INSERT INTO `entries` (`id`, `content`, `isRandomized`, `isChecked`) VALUES
(0, 'Obtain 3 Normal Types', 0, 0),
(1, 'Obtain 3 Fire Types', 0, 0),
(2, 'Obtain 3 Water Types', 0, 0),
(3, 'Obtain 3 Grass Types', 0, 0),
(4, 'Obtain 3 Electric Types', 0, 0),
(5, 'Obtain 3 Ice Types', 0, 0),
(6, 'Obtain 3 Fighting Types', 0, 0),
(7, 'Obtain 3 Poison Types', 0, 0),
(8, 'Obtain 3 Ground Types', 0, 0),
(9, 'Obtain 3 Flying Types', 0, 0),
(10, 'Obtain 3 Psychic Types', 0, 0),
(11, 'Obtain 3 Bug Types', 0, 0),
(12, 'Obtain 3 Rock Types', 0, 0),
(13, 'Obtain 3 Ghost Types', 0, 0),
(14, 'Obtain 3 Dark Types', 0, 0),
(15, 'Obtain 3 Dragon Types', 0, 0),
(16, 'Obtain 3 Steel Types', 0, 0),
(17, 'Obtain 3 Fairy Types', 0, 0),
(18, 'Evolve 3 Pokemon', 0, 0),
(19, 'Evolve a Pokemon with an Evolution Stone', 0, 0),
(20, 'Evolve a Pokemon via Happiness', 0, 0),
(21, 'Obtain a Pokemon via in-game trade', 0, 0),
(22, 'Catch 5 Pokemon', 0, 0),
(23, 'Obtain 5 Static Pokemon', 0, 0),
(24, 'Obtain 3 Dual Type Pokemon', 0, 0),
(25, 'Lose to a Gym Leader', 0, 0),
(26, 'Lose to a Normal Trainer', 0, 0),
(27, 'Find a rare candy', 0, 0),
(28, 'Get Paralyzed 3 Times', 0, 0),
(29, 'Get Burned 3 Times', 0, 0),
(30, 'Get Poisoned 5 Times', 0, 0),
(31, 'Get Confused 3 times', 0, 0),
(32, 'Get Infatuated', 0, 0),
(33, 'Get Frozen', 0, 0),
(34, 'Find a shiny pokemon', 0, 0),
(35, 'Leah Misbehaves', 0, 0),
(36, 'Hatch a Pokemon Egg', 0, 0),
(37, 'Someone redeems Minesweeper', 0, 0),
(38, 'Nickname a Pokemon with a reoccurring stream nickname', 0, 0),
(39, 'Michael gets a phone call mid-stream', 0, 0),
(40, 'Pokemon faints due to a critical hit', 0, 0),
(41, 'Ran out of healing', 0, 0),
(42, 'Use TMs 3 times', 0, 0),
(43, 'Wild Pokemon run away', 0, 0),
(44, 'Survive a hit within the red', 0, 0),
(45, 'Obtain a Pokemon with no legs', 0, 0),
(46, '3 party members share the same weakness', 0, 0),
(47, 'Pokemon self-destructs or explodes', 0, 0),
(48, 'Obtain a Gym Badge', 0, 0),
(49, 'Half the team dies in a single battle', 0, 0),
(50, 'Catch a genderless Pokemon', 0, 0),
(51, 'Vibing to the music', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `flags`
--

CREATE TABLE `flags` (
  `id` int(11) NOT NULL,
  `name` mediumtext NOT NULL,
  `value` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `flags`
--

INSERT INTO `flags` (`id`, `name`, `value`) VALUES
(1, 'allowRandomizedEntries', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flags`
--
ALTER TABLE `flags`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entries`
--
ALTER TABLE `entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `flags`
--
ALTER TABLE `flags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
