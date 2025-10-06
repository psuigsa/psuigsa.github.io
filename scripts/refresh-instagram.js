#!/usr/bin/env node

import { instagramService } from '../server/services/instagram.js';

async function refreshInstagramCache() {
  try {
    console.log('Starting Instagram cache refresh job...');
    console.log('Timestamp:', new Date().toISOString());
    
    await instagramService.refreshCache();
    
    console.log('Instagram cache refresh completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error in Instagram cache refresh job:', error);
    process.exit(1);
  }
}

// Run the refresh
refreshInstagramCache();