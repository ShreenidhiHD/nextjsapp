import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { createToken, setTokenCookie, errorResponse } from '@/helpers/tokenHelpers';

export async function POST(request: Request) {
    try {
        await connect();

        const { email, password } = await request.json();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse("User does not exist", 404);
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
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