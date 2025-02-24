import { NextResponse } from 'next/server';
import connectToDB from '@/server/config/connect.db';
import UserResponse from '@/server/model/userResponses.model';

export async function POST(request: Request) {
    console.log('Quiz submission endpoint hit');

    try {
        console.log('Attempting to connect to DB...');
        await connectToDB();
        console.log('DB connection successful');

        const body = await request.json();
        console.log('Received request body:', body);
        const userUid = body.questions.email
        let risk_score = 0, diversity_score = 0, stability_score = 0;

        risk_score =
        body.questions['1'] * 0.3 +
        body.questions['2'] * 0.2 +
        body.questions['3'] * 0.2 +
        body.questions['5'] * 0.15 +
        body.questions['6'] * 0.15;

        diversity_score =
        body.questions['4'] * 0.3 +
        body.questions['5'] * 0.25 +
        body.questions['9'] * 0.2 +
        (2 - risk_score) * 0.25;

        stability_score =
        body.questions['1'] * 0.2 +
        body.questions['2'] * 0.2 +
        body.questions['6'] * 0.3 +
        body.questions['7'] * 0.15 +
        body.questions['8'] * 0.15;

        body.risk = risk_score
        body.diversity = diversity_score
        body.stability = stability_score
        
        const duplicateUser = await UserResponse.findOne({ userId: userUid });
        if (!duplicateUser) {
            // Create new user response
            const userResponse = await UserResponse.create({
                userId: userUid,
                questions: body.questions,
                risk: body.risk,
                diversity: body.diversity,
                stability: body.stability
            });
            
        return NextResponse.json({
            success: true,
            userResponse
        }, { status: 200 });
        }else{
            duplicateUser.questions = body.questions;
            await duplicateUser.save();
            return NextResponse.json({message:'updated successfully'},{status:200});
        }



    } catch (error) {
        console.log('Error in quiz submission:', error);
        // Log more details about the error
        if (error instanceof Error) {
            console.log('Error message:', error.message);
            console.log('Error stack:', error.stack);
        }
        return NextResponse.json({
            success: false,
            error: 'Failed to save quiz response'
        }, { status: 500 });
    }
} 