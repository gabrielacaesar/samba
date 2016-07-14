package com.storck.samba.services

import spock.lang.Specification

import com.storck.samba.dto.*
import com.sun.jersey.api.client.Client
import com.sun.jersey.api.client.ClientResponse
import com.sun.jersey.api.client.WebResource

class ZencoderServiceSpec extends Specification {
	
	static String aJob = "{\"job\":{\"created_at\":\"2016-07-13T16:32:36Z\",\"finished_at\":\"2016-07-13T16:32:47Z\",\"id\":281102884,\"state\":\"finished\",\"input_media_file\":{\"url\":\"http://theinput.dv\"},\"output_media_files\":[{\"url\":\"https://theoutput.mp4\"}]}}"
	static String anotherJob = "{\"job\":{\"created_at\":\"2016-07-13T16:31:40Z\",\"finished_at\":\"2016-07-13T16:31:50Z\",\"id\":281102669,\"state\":\"finished\",\"input_media_file\":{\"url\":\"http://theinput.dv\"},\"output_media_files\":[{\"url\":\"https://theoutput.mp4\"}]}}"
	
	def 'should make an API call to list all jobs'() {
		given: "the service with a mocked api call"
		ClientResponse response = Mock(ClientResponse) {
			getStatus() >> 200
			getEntity(String.class) >> json
		}
		
		ZencoderService service = Spy(ZencoderService) {
			executeListAPICall() >> response
		}
		
		when:
		List<TranscodingJob> jobs = service.list()
		
		then:		
		jobs != null
		jobs.size() == size
		
		where:
		json									| size
		"[]"									| 0
		"[" + aJob + ", " + anotherJob + "]"	| 2
	}
	
	def 'should return null if the list API call fails'() {
		given: "the service with a mocked api call"
		ClientResponse response = Mock(ClientResponse) {
			getStatus() >> 500
		}
		
		ZencoderService service = Spy(ZencoderService) {
			executeListAPICall() >> response
		}
		
		when:
		List<TranscodingJob> jobs = service.list()
		
		then:
		jobs == null
	}
	
	def 'should make an API call to list a specific job'() {
		given: "the service with a mocked api call"
		ClientResponse getResponse = Mock(ClientResponse) {
			getStatus() >> 200
			getEntity(String.class) >> aJob
		}
		ClientResponse progressResponse = Mock(ClientResponse) {
			getStatus() >> 200
			getEntity(String.class) >> json
		}
		
		ZencoderService service = Spy(ZencoderService) {
			executeGetJobAPICall(281102884) >> getResponse
			executeGetJobProgressAPICall(281102884) >> progressResponse
		}
		
		when:
		TranscodingJob job = service.get(281102884)
		
		then:
		job != null
		job.getProgress().equals(progress)
		
		where:
		json											| progress
		"{\"state\":\"processing\",\"progress\":25}"	| 25d
		"{\"state\":\"finished\"}"						| 100d
	}
	
	def 'should return null if the get API call fails' () {
		given: "the service with a mocked api call"
		ClientResponse getResponse = Mock(ClientResponse) {
			getStatus() >> 500
		}
		
		ZencoderService service = Spy(ZencoderService) {
			executeGetJobAPICall(281102884) >> getResponse
		}
		
		when:
		TranscodingJob job = service.get(281102884)
		
		then:
		job == null		
	}
	
	def 'should make an API call to create a new job'() {
		given: "the service with a mocked api call"
		ClientResponse response = Mock(ClientResponse) {
			getStatus() >> 201
			getEntity(String.class) >> "{\"id\":281305905,\"outputs\":[{\"url\":\"https://outputfile.mp4\"}]}"
		}
		
		ZencoderService service = Spy(ZencoderService) {
			executeCreateJobAPICall("s3://someinputfile.dv") >> response
		}
		
		when:
		TranscodingJob job = service.create("s3://someinputfile.dv")
		
		then:
		job != null
		job.getId().equals(281305905)
		job.getOutputPath().equals("https://outputfile.mp4")
		job.getInputPath().equals("s3://someinputfile.dv")
	}
	
	def 'should return null if the create API call fails' () {
		given: "the service with a mocked api call"
		ClientResponse response = Mock(ClientResponse) {
			getStatus() >> 500
		}
		
		ZencoderService service = Spy(ZencoderService) {
			executeCreateJobAPICall("s3://someinputfile.dv") >> response
		}
		
		when:
		TranscodingJob job = service.create("s3://someinputfile.dv")
		
		then:
		job == null
	}
	
}
