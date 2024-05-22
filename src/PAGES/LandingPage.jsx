import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MediaCard from "../COMPONENTS/MediaCard";

import gitimg from "../image/github.jpg";
import spoimg from "../image/spotify.png";
import instaimg from "../image/insta.png";
import ximg from "../image/X.png";
import hackkerrank from "../image/HackerRank.png";
import leetcode from "../image/leetcode.png";
import linkedin from "../image/linkedin.png";

function LandingPage() {
  return (
    <>
      <Box className="LandingPage">
        <div class="hello">
          <Typography variant="h4" fontFamily={"Poetsen One"} glutterbottom>
            Merhaba Sayfama Hoşgeldiniz{" "}
          </Typography>
        </div>

        <div class="social-link">
          <MediaCard
            link={"https://github.com/WizardLizard8998"}
            img={gitimg}
            uname={"GitHub"}
            desc={
              "Selam Github sayfama aşağıdan ulaşabilirsiniz. İnceleyip Göz atmayı unutmayın :D"
            }
          />

          <MediaCard
            link={"https://www.hackerrank.com/profile/berkkanoglukerem"}
            img={hackkerrank}
            uname={"HackkerRank"}
            desc={
              "Arada burada alıştırmalar yaparak kendimi güncel tutmaya çalışırım."
            }
          />

          <MediaCard
            link={"https://leetcode.com/u/berkkanoglukerem/"}
            img={leetcode}
            uname={"LeetCode"}
            desc={
              "Buraya da göz atarak problem çözme yeteneğimi çeşitlendirmeye çalışırım."
            }
          />

          <MediaCard
            link={
              "https://www.linkedin.com/in/kerem-berkkano%C4%9Flu-a401b6209/"
            }
            img={linkedin}
            uname={"Linkedin"}
            desc={
              "Linkedin profilim ise burada yer almakta iletişim için kullanabilirsiniz."
            }
          />

          <MediaCard
            link={
              "https://open.spotify.com/user/keremberkkan?si=ae79196654554b35"
            }
            img={spoimg}
            uname={"Spotify"}
            desc={
              "Spotify listelerime bir göz atın derim kesinlikle. İçeride her türden müzik bulabilirsiniz."
            }
          />

          <MediaCard
            link={"https://www.instagram.com/kerem_berkkanoglu/"}
            img={instaimg}
            uname={"Instagram"}
            desc={
              "Instagramıma hoşgeldiniz.Burada benden izler bulabilirsiniz. "
            }
          />

          <MediaCard
            link={"https://twitter.com/berkkanoglu"}
            img={ximg}
            uname={"X"}
            desc={
              "Twitter insanların özgürlük alanıdır. Kişisel profilime buradan erişebilirsiniz."
            }
          />
        </div>
      </Box>
    </>
  );
}

export default LandingPage;
