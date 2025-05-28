import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { createToken, setTokenCookie, errorResponse } from '@/helpers/tokenHelpers';

export async function POST(request: Request) {
    try {
        await connect();        const { email, password: rawPassword } = await request.json();
        const password = rawPassword.trim(); // Remove any whitespace        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return errorResponse("User does not exist", 404);
        }

        console.log('Database user found:', {
            email: user.email,
            storedHash: user.password,
            receivedPasswordLength: password.length,
        });// Verify password
        console.log('Attempting password verification:', {
            receivedPassword: password,
            storedHashedPassword: user.password,
            salt: user.password.split('$')[2] // bcrypt salt is in the 3rd section
        });
        
        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', validPassword);
        
        if (!validPassword) {
            return errorResponse("Invalid password", 401);
        }

        // Create token
        const token = createToken(user._id.toString());

        // Set token in cookie and return response
        return setTokenCookie(token);    } catch (error: Error | unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return errorResponse("Error during login: " + errorMessage, 500);
    }
}