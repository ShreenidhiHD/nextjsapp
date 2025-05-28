import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { createToken, setTokenCookie, errorResponse } from '@/helpers/tokenHelpers';

export async function POST(request: Request) {
    try {
        await connect();

        const { username, email, password } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse("User already exists", 400);
        }       
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        console.log('Creating new user:', {
            email,
            passwordLength: password.length,
            hashedPassword
        });

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Create token
        const token = createToken(newUser._id.toString());

        // Set token in cookie and return response
        return setTokenCookie(token);

    } catch (error: Error | unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return errorResponse("Error during signup: " + errorMessage, 500);
    }
}