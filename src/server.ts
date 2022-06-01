/**
 * Custom backend server by
 * @author Ivan Moroz
 */

/**
 * Read private content from file named .env
 */
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/private/.env' });

/**
 * Start express gateway
 */
require('./express');