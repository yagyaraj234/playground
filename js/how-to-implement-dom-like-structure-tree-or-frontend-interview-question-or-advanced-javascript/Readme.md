In this question, you need to implement the following code so that when the interviewer calls vDocument.render() then the following HTML structure as a string with proper indentation should be returned.

You can also optionally print the output in the console along with returning it.

IMPORTANT: You cannot use actual DOM APIs. You need to implement everything on your own.

const vDocument = new VDocument();
const body = vDocument.createElement("body");
const div = vDocument.createElement("div");

div.innerHTML = "Hello, I am a div!";
body.appendChild(div);
vDocument.appendChild(body);

// proper html structure
const html = vDocument.render();
Output:

<html>
	<body>
		<div>
			Hello, I am a div!
		</div>
	</body>
</html>
You can use spaces or tabs to indent your output. However, test cases check for multiples of 4 spaces per tag level.

This question is designed to test various important topics like OOPS, Inheritance, Candidate's problem solving skills, understanding of DOM, how well the candidate can structure code. So, try to write as clean code as possible.
