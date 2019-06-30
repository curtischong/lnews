# This script adds cards into the newsfeed DB. Just turn on feature flags and run it
from config import config, getServerIP

import Eat
Eat.sendEatCard()