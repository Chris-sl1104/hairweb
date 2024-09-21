import React from 'react';
import { Box, Typography, Link, Button, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Deps() {
    return (
        <Box
            sx={{
                padding: '40px',
                textAlign: 'center',
                width: '100%',
                minHeight: '100vh',
                margin: '0',
                background: 'linear-gradient(135deg, #e3f2fd, #f9fbe7)',
                borderRadius: '16px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                mt: 4,
                paddingTop: '8rem',
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                About the Developer
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, fontStyle: 'italic', color: '#555' }}>
                Chris Shao
            </Typography>

            <Typography variant="body1" gutterBottom sx={{ marginBottom: 4,
                paddingX: { xs: '16px', sm: '32px', md: '48px', lg: '150px' },
                color: '#777', fontSize: '18px', lineHeight: '1.6' }}>
                Chris Shao is a full-stack developer with extensive experience in modern web technologies, cloud services, and containerization. He specializes in building scalable and reliable applications using industry-leading tools and practices.
            </Typography>

            {/* Contact Information with Icons */}
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                sx={{ mb: 4, flexWrap: 'wrap' }} // 自动换行
            >
                {/* 电话号码 */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ color: '#333', marginRight: 1 }} />
                    <Typography
                        variant="body2"
                        color="black"
                        sx={{
                            fontSize: '16px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        0493 551 300
                    </Typography>
                </Box>

                {/* 邮件地址 */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ color: '#333', marginRight: 1 }} />
                    <Typography
                        variant="body2"
                        color="black"
                        sx={{
                            fontSize: '16px',
                            wordBreak: 'nowrap',
                        }}
                    >
                        <Link
                            href="mailto:iece.chris@gmail.com"
                            sx={{ textDecoration: 'none', color: '#333', wordBreak: 'break-all' }} // 确保链接文本换行
                        >
                            iece.chris@gmail.com
                        </Link>
                    </Typography>
                </Box>
            </Stack>


            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Skills and Expertise
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ marginBottom: 4, color: '#555', fontSize: '18px', lineHeight: '1.6' }}>
                 <strong>Frontend</strong>: JavaScript (React, Next.js, Angular), HTML5, CSS3, Responsive Design, TypeScript, Redux...<br />
                 <strong>Backend</strong>: Node.js, Express, Nginx, MongoDB, PostgreSQL, MySQL<br />
                 <strong>DevOps & Cloud</strong>: AWS (EC2, S3, Lambda), Docker, Nginx<br />
                 <strong>Version Control & CI/CD</strong>: Git, GitHub Actions, Jenkins<br />
                 <strong>Containerization</strong>: Docker (Docker Compose, Docker Swarm), Kubernetes<br />
                 <strong>Security</strong>: SSL, OAuth, JWT Authentication
            </Typography>

            {/* Social Links */}
            <Typography variant="h6" gutterBottom sx={{ marginBottom: 2, fontWeight: 'bold', color: '#333' }}>
                Social Links
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={3} sx={{ marginBottom: 4 }}>
                <Button
                    variant="contained"
                    startIcon={<LinkedInIcon />}
                    href="http://linkedin.com/in/chris-shao-1aa24b217"
                    target="_blank"
                    sx={{
                        background: 'linear-gradient(135deg, #0077b5, #00a0dc)',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        '&:hover': {
                            backgroundColor: '#005582',
                        },
                    }}
                >
                    LinkedIn
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/Chris-sl1104/hairweb"
                    target="_blank"
                    sx={{
                        color: '#333',
                        borderColor: '#333',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        '&:hover': {
                            backgroundColor: '#333',
                            color: '#fff',
                        },
                    }}
                >
                    GitHub
                </Button>
            </Stack>

        </Box>
    );
}
