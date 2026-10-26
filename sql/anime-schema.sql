PRAGMA foreign_keys = ON;
CREATE TABLE account (
 account_id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE,
 email TEXT NOT NULL UNIQUE
);
-- Overlapping specialization: one account can appear in BOTH child tables.
-- PK/FK alone does not guarantee TOTAL specialization.
CREATE TABLE viewer (account_id INTEGER PRIMARY KEY REFERENCES account(account_id));
CREATE TABLE content_admin (
 account_id INTEGER PRIMARY KEY REFERENCES account(account_id), department TEXT NOT NULL
);
CREATE TABLE anime (
 anime_id INTEGER PRIMARY KEY, title TEXT NOT NULL,
 release_year INTEGER CHECK(release_year BETWEEN 1900 AND 2200)
);
CREATE TABLE genre (genre_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE anime_genre (
 anime_id INTEGER NOT NULL REFERENCES anime(anime_id) ON DELETE CASCADE,
 genre_id INTEGER NOT NULL REFERENCES genre(genre_id), PRIMARY KEY(anime_id,genre_id)
);
CREATE TABLE studio (studio_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE produced_by (
 anime_id INTEGER NOT NULL REFERENCES anime(anime_id) ON DELETE CASCADE,
 studio_id INTEGER NOT NULL REFERENCES studio(studio_id), PRIMARY KEY(anime_id,studio_id)
);
CREATE TABLE episode (
 anime_id INTEGER NOT NULL REFERENCES anime(anime_id) ON DELETE CASCADE,
 episode_no INTEGER NOT NULL CHECK(episode_no>0), title TEXT NOT NULL,
 duration_sec INTEGER NOT NULL CHECK(duration_sec>0), PRIMARY KEY(anime_id,episode_no)
);
CREATE TABLE watch_list (
 list_id INTEGER PRIMARY KEY, viewer_id INTEGER NOT NULL REFERENCES viewer(account_id),
 name TEXT NOT NULL, UNIQUE(viewer_id,name)
);
CREATE TABLE contains (
 list_id INTEGER NOT NULL REFERENCES watch_list(list_id) ON DELETE CASCADE,
 anime_id INTEGER NOT NULL REFERENCES anime(anime_id) ON DELETE CASCADE,
 added_at TEXT NOT NULL, PRIMARY KEY(list_id,anime_id)
);
CREATE TABLE rating (
 viewer_id INTEGER NOT NULL REFERENCES viewer(account_id),
 anime_id INTEGER NOT NULL REFERENCES anime(anime_id),
 score INTEGER NOT NULL CHECK(score BETWEEN 1 AND 10), PRIMARY KEY(viewer_id,anime_id)
);
