In the Machine Coding rounds, the candidates are usually asked to come up with a solution for a given problem statement or they might be asked to implement a UI component from the ground up. In this question, you would need to build an Accordion component and the markup of it should look like the following:

<Accordion collapsible>
  <AccordionItem id="1">
    <AccordionToggle>Devtools Tech? 🤔</AccordionToggle>
    <AccordionPanel>
      The aim with Devtools Tech is to create a platform for Frontend
      Engineers where we all can improve, invest in ourselves, and grow by
      learning from high quality real world programming content. This is a
      platform where you can practice actual interview questions, watch
      courses, read blogs, and keep track of your progress across various
      domains and topics.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem id="2">
    <AccordionToggle>Is it Free?</AccordionToggle>
    <AccordionPanel>
      Yes, the platform and YouTube both are completely free!
    </AccordionPanel>
  </AccordionItem>
</Accordion>
Or you can also have the API as following:

<Accordion collapsible>
  <Accordion.Item id="1">
    <Accordion.Toggle>Devtools Tech? 🤔</Accordion.Toggle>
    <Accordion.Panel>
      The aim with Devtools Tech is to create a platform for Frontend
      Engineers where we all can improve, invest in ourselves, and grow by
      learning from high quality real world programming content. This is a
      platform where you can practice actual interview questions, watch
      courses, read blogs, and keep track of your progress across various
      domains and topics.
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item id="2">
    <Accordion.Toggle>Is it Free?</Accordion.Toggle>
    <Accordion.Panel>
      Yes, the platform and YouTube both are completely free!
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>
