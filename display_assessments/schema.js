reccap_records = {

    'test_dates' : [],

    // array of reccap_section objects
    'sections' : 

    [
        {
            "title": "Quality of Life",
            "questions": [
                {
                    "slug": "qolCapital_accomodation",
                    "sectionNum": "0",
                    "text": "How would you rate the quality of your accommodation?",
                    'type' : '20',
                    "answers": []
                },
                {
                    "slug": "qolCapital_overallQualityofLife",
                    "sectionNum": "0",
                    "text": "How would you rate your overall quality of life?",
                    'type' : '20',
                    "answers": []
                },
                {
                    "slug": "qolCapital_physicalHealth",
                    "sectionNum": "0",
                    "text": "How good is your physical health?",
                    'type' : '20',
                    "answers": []
                },
                {
                    "slug": "qolCapital_psychologicalHealth",
                    "sectionNum": "0",
                    "text": "How good is your psychological health? (1-20)",
                    'type' : '20',
                    "answers": []
                },
                {
                    "slug": "qolCapital_supportNetwork",
                    "sectionNum": "0",
                    "text": "How would you rate your support network?",
                    'type' : '20',
                    "answers": []
                }
            ]
        },
        {
            "title": "Community Capital",
            "questions": [
                {
                    "slug": "communityCapital_participation",
                    "sectionNum": "1",
                    "text": "I participate in recovery groups.",
                    "type": "3",
                    "answers": []
                },
                {
                    "slug": "communityCapital_connected",
                    "sectionNum": "1",
                    "text": "I feel connected to a recovery community. ",
                    "type": "3",
                    "answers": []
                },
                {
                    "slug": "communityCapital_socialization",
                    "sectionNum": "1",
                    "text": "I socialize in a recovery community.",
                    "type": "Aggregate",
                    "type": "3",
                },
                {
                    "slug": "communityCapital_dailyActivities",
                    "sectionNum": "1",
                    "text": "I practice recovery every day.",
                   "type": "3",
                    "answers": []
                },
                {
                    "slug": "communityCapital_groupService",
                    "sectionNum": "1",
                    "text": "I perform service in the recovery community.",
                    "type": "2",
                    "answers": []
                }
            ]
        },
        {
            "title": "Personal Capital",
            "questions": [
                {
                    "slug": "personalCapital_coping",
                    "sectionNum": "2",
                    "text": "I am good at coping with life's challenges.",
                    "type": "5",
                    "answers": []
                },
                {
                    "slug": "personalCapital_physicalHealth",
                    "sectionNum": "2",
                    "text": "I am in good physical health.",
                    "type": "5",
                    "answers": []
                },
                {
                    "slug": "personalCapital_psychologicalHealth",
                    "sectionNum": "2",
                    "text": "I am in good psychological health.",
                    "type": "5",
                    "answers": []
                },
                {
                    "slug": "personalCapital_recoveryExperience",
                    "sectionNum": "2",
                    "text": "I value my recovery experience.",
                    "type": "5",
                    "answers": []
                },
                {
                    "slug": "personalCapital_riskTaking",
                    "sectionNum": "2",
                    "text": "I am careful around taking risks.",
                    "type": "5",
                    "answers": []
                }
            ]
        },
        {
            "title": "Social Capital",
            "questions": [
                {
                    "slug": "socialCapital_citizenship",
                    "sectionNum": "3",
                    "text": "I work hard to be a good citizen.",
                    "type": "5",
                    "answers": []
                },
                {
                    "slug": "socialCapital_housingAndSaftey",
                    "sectionNum": "3",
                    "text": "I prioritize the safety of my home.",
                    "type": "5",
                    "answers": []
                },
                {
                    "slug": "socialCapital_meaningfulActivites",
                    "sectionNum": "3",
                    "text": "I participate in meaningful activities.",
                    "type": "5",
                    "answers": []
                },
                {
                    "slug": "socialCapital_socialSupport",
                    "sectionNum": "3",
                    "text": "I receive high quality social support.",
                    "type": "5",
                    "answers": []
                },
                {
                    "slug": "socialCapital_substanceUseAndSobriety",
                    "sectionNum": "3",
                    "text": "I support my peers in remaining sober.",
                    "type": "5",
                    "answers": []
                }
            ]
        },
        {
            "title": "Barriers",
            "questions": [
                {
                    "slug": "barrier_accomodation",
                    "sectionNum": "4",
                    "text": "Are you free of housing problems?",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "barrier_criminalJustice",
                    "sectionNum": "4",
                    "text": "Are you free of criminal justice problems?",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "barrier_riskTaking",
                    "sectionNum": "4",
                    "text": "Are you free of risk taking problems?",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "barrier_substanceUse",
                    "sectionNum": "4",
                    "text": "Are you free of SUD problems?",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "barrier_wtv",
                    "sectionNum": "4",
                    "text": "Are you free of WTV problems?",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                }
            ]
        },
        {
            "title": "Service Needs Met",
            "questions": [
                {
                    "slug": "serviceNeed_alcoholTreatment",
                    "sectionNum": "5",
                    "text": "Alcohol Treatment",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "serviceNeed_drugTreatment",
                    "sectionNum": "5",
                    "text": "Drug Treatment",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "serviceNeed_employmentSupport",
                    "sectionNum": "5",
                    "text": "Employment Services",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "serviceNeed_familyRelationships",
                    "sectionNum": "5",
                    "text": "Family Relationships",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "serviceNeed_housingSupport",
                    "sectionNum": "5",
                    "text": "Housing Support Services",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "serviceNeed_mentalHealthcare",
                    "sectionNum": "5",
                    "text": "Mental Health Services",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "serviceNeed_otherSpecialist",
                    "sectionNum": "5",
                    "text": "Other Specialist Help",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "serviceNeed_primaryHealthcare",
                    "sectionNum": "5",
                    "text": "Primary Healthcare",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                }
            ]
        },
        {
            "title": "Substance Use",
            "questions": [
                {
                    "slug": "substanceUse_usedSubstances",
                    "sectionNum": "6",
                    "text": "Have you used any legal or illegal substances in the last 90 days?",
                    "type": "YesNo",
                    "range": "0-4",
                    "answers": []
                },
                {
                    "slug": "substanceUse_sumDaysUsed",
                    "sectionNum": "6",
                    "text": "Have you abstained from drugs for the last three months?",
                    "type": "YesNo",
                    "range": "",
                    "answers": []
                }
            ]
        },
        {
            "title": "Safety & Security",
            "questions": [
                {
                    "slug": "involvedWithPolice",
                    "sectionNum": "7",
                    "text": "Are you free of police involvement?",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "involvedInOffending",
                    "sectionNum": "7",
                    "text": "Are you free from criminal activity?",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "housingSecurity_livingOnStreets",
                    "sectionNum": "7",
                    "text": "Are you been free from homelessness for 90 days?",
                    "type": "YesNo",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "housingSecurity_livingInHostel",
                    "sectionNum": "7",
                    "text": "Have you been free from living in a shelter for 90 days?",
                    "type": "YesNo",
                    "range": "",
                    "answers": []
                },
                {
                    "slug": "infectiousDisease_sharedApparatus",
                    "sectionNum": "7",
                    "text": "Are you free from sharing drug paraphanalia?",
                    "type": "YesNo",
                    "range": "0",
                    "answers": []
                },
                {
                    "slug": "infectiousDisease_sharedNeedles",
                    "sectionNum": "7",
                    "text": "Are you free from sharing needles?",
                    "type": "YesNo",
                    "range": "0",
                    "answers": []
                }
            ]
        },
        {
            "title": "Pro-Social Activity",
            "questions": [
                {
                    "slug": "employed_fullTime",
                    "sectionNum": "8",
                    "text": "Are you currently working full-time?",
                    "type": "NoYes",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "employed_partTime",
                    "sectionNum": "8",
                    "text": "Are you currently working part-time?",
                    "type": "NoYes",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "education_and_training",
                    "sectionNum": "8",
                    "text": "Are you currently enrolled in formal education?",
                    "type": "NoYes",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "education_and_training_engaged",
                    "sectionNum": "8",
                    "text": "If so, are you currently engaged in formal education?",
                    "type": "NoYes",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "academic_self_improvement_engaged",
                    "sectionNum": "8",
                    "text": "If so, are you currently improving in your education?",
                    "type": "NoYes",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "currentlyVolunteering",
                    "sectionNum": "8",
                    "text": "Are you currently volunteering?",
                    "type": "NoYes",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "voluntaryRecoveryGroupService",
                    "sectionNum": "8",
                    "text": "Do you perform service within a recovery group?",
                    "type": "NoYes",
                    "range": "0-1",
                    "answers": []
                },
                {
                    "slug": "performsRecoveryGroupService",
                    "sectionNum": "8",
                    "text": "If so, do you do so frequently?",
                    "type": "NoYes",
                    "range": "0-1",
                    "answers": []
                }
            ]
        },
        {
            "title": "Commitment Capital",
            "questions": [
                {
                    "slug": "commitmentCapital_importanceOfRecovery",
                    "sectionNum": "9",
                    "text": "Staying sober is the most important thing in my life.",
                    "type": "6",
                    "answers": []
                },
                {
                    "slug": "commitmentCapital_commitmentToRecovery",
                    "sectionNum": "9",
                    "text": "I am totally committed to staying off of alcohol\/drugs.",
                    "type": "6",
                    "answers": []
                },
                {
                    "slug": "commitmentCapital_adverseToFurtherUse",
                    "sectionNum": "9",
                    "text": "I have had enough alcohol and drugs.",
                    "type": "6",
                    "answers": []
                },
                {
                    "slug": "commitmentCapital_finishedWithActiveUse",
                    "sectionNum": "9",
                    "text": "I never want to return to alcohol\/drug use again.",
                    "type": "6",
                    "answers": []
                },
                {
                    "slug": "commitmentCapital_willingToProtectRecovery",
                    "sectionNum": "9",
                    "text": "I will do whatever it takes to recover from my addiction.",
                    "type": "6",
                    "answers": []
                }
            ]
        }
    ]
}