import FullPageScroller from './FullPageScroller';
import FemaleCounter from './FemaleCounter';
import DisasterLineGraph from './DisasterLineGraph';
import Choropleth from './Choropleth';
import Correlator from './Correlator';
import Highlight from './Highlight';
import Pie from './Pie';
import { Container } from 'react-bootstrap';

export default function Article() {
  return (
    <>
      <Container>
        <h2>Introduction</h2>
        In March 2023, we attended a Jane Street recruiting session for STEM focused Waterloo
        undergraduates. We noticed something subtle right as we entered the room: Jane Street
        recruiters signed us into the event, and they were all female. They were setting up the
        room, and organized the entire event which included food, puzzles, and social networking.
        Later on in the event, we had the opportunity to talk to full-time software engineers and
        quantitative traders who work at the company. But, in contrast to the group of women who
        greeted us at the entrance, this group of engineers was exclusively male. While this is just
        one personal anecdote, it aligns with an alarming reality of the one sided gender ratio in many
        STEM fields. 
      </Container>
      <FullPageScroller Background={Pie}>
        <div>
          In Computer Science, you're likely to notice an
          overwhelming percent of computer scientists are men.
        </div>
        <div>
          The 2022 Stack Overflow survey of over
          70,000 software developers found that globally only 5.17% of{' '}
          <a href="https://survey.stackoverflow.co/2022">respondents were women</a>, an unnerving
          statistic for one of the most popular help sites for software
          engineering.
        </div>
        <div>
          In the United States, the software publishing industry as a whole has a
          slightly better ratio with females making up 31% of the{' '}
          <a href="https://www.bls.gov/cps/cpsaat18.htm">workforce</a>.
        </div>
      </FullPageScroller>
      <Container>
           We can also find this disparity in the education system. 
      </Container>
      <FullPageScroller Background={FemaleCounter}>
        <div>
          Let's consider a group of <Highlight color="#222222">100 post-secondary students</Highlight>.
        </div>
        <div>
          In 1970, <Highlight color="#ffc0cb">42 of them</Highlight> would have been women, on
          average.
        </div>
        <div>
          Today, women make up <Highlight color="#ffc0cb">over half</Highlight> of the students.
        </div>
        <div>
          However, if we consider only STEM classes, this{' '}
          <Highlight color="#ffc0cb">drops to 34%</Highlight>.
        </div>
        <div>
          Even worse, if this is a Computer Science class, we can expect as few as{' '}
          <Highlight color="#ffc0cb">20 women</Highlight>.
        </div>
      </FullPageScroller>
      <Container>
        <h2>The Gender Ratio Over Time</h2>
        Over the past decades, the ratio of women in STEM fields has changed. However, different
        countries are experiencing different trends. For example, some countries reported a majority
        of women in STEM classrooms around the 1990s. By the 2010s, some of these same countries
        reported an increase in male students entering the field, decreasing the ratio of women
        significantly. Continue scrolling.
      </Container>
      <DisasterLineGraph />
      <Container>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, dignissimos! Nisi dicta
        modi harum cumque fuga temporibus ullam vel saepe deleniti numquam laboriosam quasi nobis
        error illo adipisci, aut voluptas. Quaerat, perspiciatis! Vel ipsum totam non repellendus
        inventore reprehenderit obcaecati expedita quos eius, dolorum perspiciatis voluptates itaque
        reiciendis ab culpa dignissimos ipsam voluptate id sequi quia earum. Eos, consequatur
        assumenda. Quaerat architecto, maxime magnam ipsa incidunt fuga exercitationem expedita
        molestiae in error quibusdam, animi eius accusamus nihil sapiente necessitatibus illo
        itaque, tenetur ipsam vel repellendus aspernatur. Cumque voluptatem quam voluptatum! Dolorum
        nesciunt deleniti cumque ut. Dolorum ipsum enim sed? Tempore magni voluptate necessitatibus,
        fuga consequatur obcaecati molestiae cumque delectus deleniti suscipit amet consectetur
        consequuntur soluta id quae dolorum accusamus adipisci. Laborum provident dignissimos
        temporibus itaque repellendus aut quam iusto beatae molestias vel totam doloremque magni
        harum amet ipsam nisi, officia praesentium in fugiat, quisquam, cupiditate deleniti
        aspernatur? Quo, voluptatibus modi.
      </Container>
      <Choropleth />
      <Container>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, dignissimos! Nisi dicta
        modi harum cumque fuga temporibus ullam vel saepe deleniti numquam laboriosam quasi nobis
        error illo adipisci, aut voluptas. Quaerat, perspiciatis! Vel ipsum totam non repellendus
        inventore reprehenderit obcaecati expedita quos eius, dolorum perspiciatis voluptates itaque
        reiciendis ab culpa dignissimos ipsam voluptate id sequi quia earum. Eos, consequatur
        assumenda. Quaerat architecto, maxime magnam ipsa incidunt fuga exercitationem expedita
        molestiae in error quibusdam, animi eius accusamus nihil sapiente necessitatibus illo
        itaque, tenetur ipsam vel repellendus aspernatur. Cumque voluptatem quam voluptatum! Dolorum
        nesciunt deleniti cumque ut. Dolorum ipsum enim sed? Tempore magni voluptate necessitatibus,
        fuga consequatur obcaecati molestiae cumque delectus deleniti suscipit amet consectetur
        consequuntur soluta id quae dolorum accusamus adipisci. Laborum provident dignissimos
        temporibus itaque repellendus aut quam iusto beatae molestias vel totam doloremque magni
        harum amet ipsam nisi, officia praesentium in fugiat, quisquam, cupiditate deleniti
        aspernatur? Quo, voluptatibus modi.
      </Container>
      <Correlator />
    </>
  );
}
