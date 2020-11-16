AWS_PROFILE=default
AWS_BUCKET=BUCKET
AWS=docker run --rm -ti -e AWS_PROFILE=${AWS_PROFILE} -v ~/.aws:/root/.aws -v $(shell pwd):/aws amazon/aws-cli

deploy:
	$(AWS) s3 cp --acl public-read --recursive . s3://${AWS_BUCKET}/ --exclude ".git/*"